import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course.entity';
import { Student } from '../../services/students.service';
import { StudentsService } from '../../services/students.service';
import { GradesService, Grade } from '../../../core/services/grades.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-gradebook',
  templateUrl: './course-gradebook.component.html',
  styleUrls: ['./course-gradebook.component.css']
})
export class CourseGradebookComponent implements OnInit {
  course: Course | undefined;
  students: Student[] = [];
  grades: { [studentId: number]: Grade } = {};
  classroomId: number | undefined;
  courseId: number | undefined;
  isLoading = true;
  notas = ['nota1', 'nota2', 'nota3', 'nota4', 'nota5', 'nota6', 'nota7'];
  displayedColumns = ['name', ...this.notas, 'promedio'];
  showResumen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private studentsService: StudentsService,
    private gradesService: GradesService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseId = +courseId;
      this.courseService.getCourseById(courseId).subscribe({
        next: (data) => {
          this.course = data;
          this.classroomId = data.classroomId;
          this.loadStudentsAndGrades();
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        }
      });
    }
    // Si viene el parámetro 'view', mostrar solo el resumen
    this.route.params.subscribe(params => {
      if (params['view']) {
        this.showResumen = true;
      }
    });
  }

  loadStudentsAndGrades() {
    if (!this.classroomId || !this.courseId) return;
    this.studentsService.getAll().subscribe({
      next: (students) => {
        this.students = students.filter(s => s.classroomId === this.classroomId);
        this.loadGradesForStudents();
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadGradesForStudents() {
    if (!this.courseId || !this.classroomId) return;
    this.gradesService.getByCourseAndClassroom(this.courseId.toString(), this.classroomId.toString()).subscribe({
      next: (grades) => {
        for (const grade of grades) {
          if (grade && grade.studentId) {
            this.grades[+grade.studentId] = grade;
          }
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getNota(studentId: number, nota: string): number | null {
    const grade = this.grades[studentId];
    const value = grade && grade[nota] !== undefined ? grade[nota] : null;
    return value === undefined ? null : value;
  }

  onNotaChange(student: Student, nota: string, value: any) {
    const parsedValue = value === '' || value === null ? null : Number(value);
    if (!this.grades[student.id!]) {
      this.grades[student.id!] = {
        studentId: student.id!.toString(),
        courseId: this.courseId!.toString(),
        nota1: undefined, nota2: undefined, nota3: undefined, nota4: undefined, nota5: undefined, nota6: undefined, nota7: undefined,
        score: 0, semester: '', year: new Date().getFullYear()
      };
    }
    this.grades[student.id!][nota] = parsedValue;
    // No guardar automáticamente, solo actualizar el modelo
  }

  saveGrade(student: Student, grade: Grade) {
    // Si existe id, actualizar; si no, crear
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const teacherId = currentUser.id ? Number(currentUser.id) : undefined;
    const gradeRequest = {
      studentId: String(student.id!),
      courseId: String(this.courseId!),
      classroomId: String(this.classroomId!),
      teacherId: teacherId !== undefined ? String(teacherId) : undefined,
      nota1: grade.nota1,
      nota2: grade.nota2,
      nota3: grade.nota3,
      nota4: grade.nota4,
      nota5: grade.nota5,
      nota6: grade.nota6,
      nota7: grade.nota7,
      // Los siguientes campos son requeridos por el tipo Grade, pero el backend no los usa para crear
      score: 0,
      semester: '',
      year: new Date().getFullYear()
    };
    if (grade.id) {
      this.gradesService.update(grade.id, gradeRequest).subscribe({
        next: (updated) => {
          this.grades[+student.id!] = updated;
        },
        error: (err) => console.error(err)
      });
    } else {
      this.gradesService.create(gradeRequest).subscribe({
        next: (created) => {
          this.grades[+student.id!] = created;
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSaveAll() {
    // Guarda todas las notas editadas
    for (const student of this.students) {
      const grade = this.grades[student.id!];
      if (grade) {
        this.saveGrade(student, grade);
      }
    }
  }

  calcularPromedio(studentId: number): string {
    const grade = this.grades[studentId];
    if (!grade) return '-';
    let sum = 0;
    let count = 0;
    for (const n of this.notas) {
      const val = grade[n];
      if (typeof val === 'number' && !isNaN(val)) {
        sum += val;
        count++;
      }
    }
    return count > 0 ? (sum / count).toFixed(2) : '-';
  }

  onViewNotas() {
    this.showResumen = !this.showResumen;
    // Si se va a mostrar el resumen y aún no hay notas cargadas, cargar notas
    if (this.showResumen && Object.keys(this.grades).length === 0) {
      this.loadGradesForStudents();
    }
  }
}
