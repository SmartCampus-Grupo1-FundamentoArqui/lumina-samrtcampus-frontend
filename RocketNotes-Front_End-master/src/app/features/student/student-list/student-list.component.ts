import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogStudentComponent } from "../dialog-student/dialog-student.component";
import { StudentsService, Student, StudentRequest } from "../../../infrastructure/services/students.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastNameFather', 'lastNameMother', 'dni', 'classroom', 'action'];
  dataSource: Student[] = [];

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshStudentList();
  }

  refreshStudentList(): void {
    this.studentsService.getAll().subscribe({
      next: (response) => {
        this.dataSource = response;
        console.log('Students loaded:', this.dataSource);
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  onEditItem(student: Student): void {
    // Implementar edición
  }

  onDeleteItem(student: Student): void {
    // Implementar eliminación
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.student && result.parent) {
        console.log('Dialog result:', result);
        
        const studentRequest: StudentRequest = {
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

        console.log('Sending student request:', studentRequest);
        console.log('ClassroomId value:', result.student.classroomId, 'Type:', typeof result.student.classroomId);
        
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
