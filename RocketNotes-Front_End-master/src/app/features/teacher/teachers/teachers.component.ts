import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TeacherService} from "../service/teacher.service";
import {DialogTeacherComponent} from "../dialog-teacher/dialog-teacher.component";
import { CoursesService } from '../../../infrastructure/services/courses.service';
import { Course } from '../../../infrastructure/model/course.entity';
import { TeacherCoursesDialogComponent } from '../teacher-courses-dialog/teacher-courses-dialog.component';
export interface Teacher {
  id?: number;
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  email: string;
  phone: string;
  password?: string;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {


  displayedColumns: string[] = ['id','name','email','phone','action']

  dataSource: Teacher[] = [];
  currentUserEmail: string = '';
  teacher: any={}
  selectedTeacherCourses: Course[] = [];
  showCourses: boolean = false;
  constructor( private apiTeacher: TeacherService, public dialog: MatDialog, private coursesService: CoursesService) { }


  ngOnInit(): void {
    // Obtener email del usuario autenticado
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserEmail = currentUser.email || '';
    this.apiTeacher.getAll().subscribe({
      next: (response: any) => {
        // Filtrar solo los datos creados por este admin (requiere campo createdBy/email en backend)
        this.dataSource = response.filter((teacher: any) => !teacher.createdBy || teacher.createdBy === this.currentUserEmail);
        console.log(this.dataSource);
      }
    });
  }
  onEditItem(teacher: Teacher){
    const dialogRef = this.dialog.open(DialogTeacherComponent, {
      width: '600px',
      data: {
        firstName: teacher.firstName,
        lastNameFather: teacher.lastNameFather,
        lastNameMother: teacher.lastNameMother,
        email: teacher.email,
        phone: teacher.phone,
        password: '' // No mostramos la contraseña por seguridad
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.firstName && result.lastNameFather && result.lastNameMother && result.email && result.phone) {
        let updatedTeacher: Teacher = {
          firstName: result.firstName,
          lastNameFather: result.lastNameFather,
          lastNameMother: result.lastNameMother,
          email: result.email,
          phone: result.phone
        };

        // Solo incluir password si se proporcionó una nueva
        if (result.password && result.password.trim() !== '') {
          updatedTeacher.password = result.password;
        }

        this.apiTeacher.update(teacher.id!, updatedTeacher).subscribe({
          next: (response: any) => {
            console.log('Teacher updated successfully:', response);
            this.ngOnInit(); // Actualizar la lista
          },
          error: (error: any) => {
            console.error('Error updating teacher:', error);
            alert('Error al actualizar el profesor. Por favor, intenta nuevamente.');
          }
        });
      }
    });
  }

  onDeleteItem(teacher: Teacher){
    // Temporalmente deshabilitado hasta que se implemente el endpoint DELETE en el backend
    alert('La funcionalidad de eliminar profesores no está disponible actualmente. El backend no tiene implementado el endpoint DELETE /teachers/{id}');
    
    /* Código para cuando se implemente el endpoint DELETE:
    if (confirm(`¿Estás seguro de que deseas eliminar al profesor ${teacher.firstName} ${teacher.lastNameFather}?`)) {
      this.apiTeacher.delete(teacher.id!).subscribe({
        next: (response: any) => {
          console.log('Teacher deleted successfully:', response);
          this.ngOnInit(); // Actualizar la lista
        },
        error: (error: any) => {
          console.error('Error deleting teacher:', error);
          alert('Error al eliminar el profesor. Por favor, intenta nuevamente.');
        }
      });
    }
    */
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogTeacherComponent, {
      width: '600px',
      data: {
        firstName: '',
        lastNameFather: '',
        lastNameMother: '',
        email: '',
        phone: '',
        password: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.firstName && result.lastNameFather && result.lastNameMother && result.email && result.phone && result.password) {
        // Obtener email del usuario autenticado
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        let teacher: any = {
          firstName: result.firstName,
          lastNameFather: result.lastNameFather,
          lastNameMother: result.lastNameMother,
          email: result.email,
          phone: result.phone,
          password: result.password,
          createdBy: currentUser.email || ''
        };
        this.apiTeacher.create(teacher).subscribe({
          next: (response: any) => {
            console.log('Teacher created successfully:', response);
            // Actualizar la lista de profesores
            this.ngOnInit();
          },
          error: (error: any) => {
            console.error('Error creating teacher:', error);
            alert('Error al crear el profesor. Por favor, intenta nuevamente.');
          }
        });
      }
    });
  }

  onShowCourses(teacher: Teacher) {
    if (!teacher.id) return;
    this.coursesService.getCoursesByTeacher(teacher.id).subscribe({
      next: (courses) => {
        this.dialog.open(TeacherCoursesDialogComponent, {
          width: '400px',
          data: {
            teacherName: `${teacher.firstName} ${teacher.lastNameFather} ${teacher.lastNameMother}`,
            courses: courses,
            teacherId: teacher.id
          }
        });
      },
      error: (err) => {
        console.error('Error fetching courses for teacher:', err);
        this.dialog.open(TeacherCoursesDialogComponent, {
          width: '400px',
          data: {
            teacherName: `${teacher.firstName} ${teacher.lastNameFather} ${teacher.lastNameMother}`,
            courses: []
          }
        });
      }
    });
  }
  onHideCourses() {
    this.showCourses = false;
    this.selectedTeacherCourses = [];
  }

}
