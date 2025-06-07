import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {GradeDialogComponent} from "./grade-dialog.component";
@Component({
    selector: 'app-root',
    templateUrl:'./classroom-grades.component.html',
    styleUrls:['./classroom-grades.component.css']
})
export class ClassroomGradesComponent  {

    isEditing = false;
    isAddingGrade = false; // Nueva propiedad para controlar si se está agregando una nueva nota

    constructor(
        public dialog: MatDialog,

    ) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(GradeDialogComponent);

        dialogRef.componentInstance.accept.subscribe(() => {
            this.isAddingGrade = true; // Cambia a true cuando se hace clic en "Accept"
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    saveGrades(): void {
        this.students.forEach(student => {
            if (student.newGrade !== null && student.newGrade >= 0 && student.newGrade <= 20) {
                student.grades.push(student.newGrade);
                student.average = this.calculateAverage(student.grades); // Recalcula el promedio
                student.state = student.average >= 12.5 ? 'green' : 'red'; // Actualiza el estado
            }
        });
        this.isAddingGrade = false;

        localStorage.setItem('students', JSON.stringify(this.students));
    }

    students = [
        { name:'EstudianteU202218475', grades: [20, 15, 18], average: 0, state: '', newGrade: null },
        { name:'EstudianteU202218476', grades: [10, 10, 16], average: 0, state: '', newGrade: null },
        { name:'EstudianteU202218477', grades: [11, 14, 13], average: 0, state: '', newGrade: null },

    ];

    calculateAverage(grades: number[]): number {
        const sum = grades.reduce((a, b) => a + b, 0);
        return sum / grades.length;
    }

    // Agrega un nuevo método para verificar si la nota es válida
    isValidGrade(): boolean {
        return this.students.every(student => student.newGrade !== null && student.newGrade >= 0 && student.newGrade <= 20);
    }

    ngOnInit() {

        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            this.students = JSON.parse(storedStudents);
        }

        this.students.forEach(student => {
            student.average = this.calculateAverage(student.grades);
            student.state = student.average >= 12.5 ? 'green' : 'red';
        });
    }
}
