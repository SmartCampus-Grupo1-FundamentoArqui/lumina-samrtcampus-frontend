import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogStudentComponent } from "../dialog-student/dialog-student.component";
import { StudentsService, Student, StudentRequest } from "../../../infrastructure/services/students.service";
import { ClassroomsService } from '../../../infrastructure/services/classrooms.service';
import { Classroom } from '../../../infrastructure/model/classroom.entity';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastNameFather', 'lastNameMother', 'dni', 'classroom', 'action'];
  dataSource: Student[] = [];
  currentUserEmail: string = '';
  classrooms: Classroom[] = [];

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private classroomsService: ClassroomsService
  ) { }

  ngOnInit(): void {
    this.classroomsService.getAll().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
        this.refreshStudentList();
      },
      error: (error) => {
        console.error('Error loading classrooms:', error);
        this.refreshStudentList();
      }
    });
  }

  refreshStudentList(): void {
    // Obtener email del usuario autenticado
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserEmail = currentUser.email || '';
    this.studentsService.getAll().subscribe({
      next: (response) => {
        // Filtrar solo los datos creados por este admin (requiere campo createdBy/email en backend)
        this.dataSource = response.filter((student: any) => !student.createdBy || student.createdBy === this.currentUserEmail);
        console.log('Students loaded:', this.dataSource);
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  getClassroomDisplayName(classroomId: number | undefined): string {
    const classroom = this.classrooms.find(c => c.id === classroomId);
    return classroom
      ? `Section ${classroom.section} (${classroom.roomNumber})`
      : 'Not Assigned';
  }

  onEditItem(student: Student): void {
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '600px',
      data: {
        student: {
          classroomId: student.classroomId,
          dni: student.dni,
          firstName: student.firstName,
          lastNameFather: student.lastNameFather,
          lastNameMother: student.lastNameMother
        },
        parent: student.parent ? {
          dni: student.parent.dni,
          email: student.parent.email,
          firstName: student.parent.firstName,
          lastNameFather: student.parent.lastNameFather,
          lastNameMother: student.parent.lastNameMother,
          phone: student.parent.phone
        } : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.student && result.parent) {
        const updatedStudent: Student = {
          id: student.id,
          firstName: result.student.firstName,
          lastNameFather: result.student.lastNameFather,
          lastNameMother: result.student.lastNameMother,
          dni: result.student.dni,
          classroomId: result.student.classroomId,
          parent: {
            firstName: result.parent.firstName,
            lastNameFather: result.parent.lastNameFather,
            lastNameMother: result.parent.lastNameMother,
            dni: result.parent.dni,
            phone: result.parent.phone,
            email: result.parent.email
          }
        };
        if (student.id) {
          this.studentsService.update(student.id.toString(), updatedStudent).subscribe({
            next: () => {
              this.refreshStudentList();
            },
            error: (error) => {
              console.error('Error updating student:', error);
            }
          });
        }
      }
    });
  }

  onDeleteItem(student: Student): void {
    if (confirm('Are you sure you want to delete this student?')) {
      if (student.id) {
        this.studentsService.delete(student.id.toString()).subscribe({
          next: () => {
            this.refreshStudentList();
          },
          error: (error) => {
            console.error('Error deleting student:', error);
          }
        });
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.student && result.parent) {
        // Obtener email del usuario autenticado
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const studentRequest: any = {
          firstName: result.student.firstName,
          lastNameFather: result.student.lastNameFather,
          lastNameMother: result.student.lastNameMother,
          dni: result.student.dni,
          classroomId: result.student.classroomId,
          parent: {
            firstName: result.parent.firstName,
            lastNameFather: result.parent.lastNameFather,
            lastNameMother: result.parent.lastNameMother,
            dni: result.parent.dni,
            phone: result.parent.phone,
            email: result.parent.email
          },
          createdBy: currentUser.email || ''
        };
        this.studentsService.create(studentRequest).subscribe({
          next: (response) => {
            console.log('Student created successfully:', response);
            this.refreshStudentList();
          },
          error: (error) => {
            console.error('Error creating student:', error);
            // Aquí podrías agregar un snackbar o dialog para mostrar el error
          }
        });
      }
    });
  }
}
