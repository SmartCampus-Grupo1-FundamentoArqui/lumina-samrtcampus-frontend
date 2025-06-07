import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AssistanceDialogComponent} from "./assistance-dialog.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl:'./classrooms-attendance.component.html',
    styleUrls:['./classrooms-attendance.component.css']
})

export class ClassroomsAttendanceComponent implements OnInit  {

    isAssistanceTaken = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,

    ) {}



    ngOnInit() {

        const storedStudents = localStorage.getItem('attendanceStudents');
        if (storedStudents) {
            this.students = JSON.parse(storedStudents);
        } else {

        }
    }


    students = [
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'}, {date:'4.FEB.2024', status:'absent'}, ] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'}, {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'absent'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'absent'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'absent'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
    ];

    openDialog(): void {
        const dialogRef = this.dialog.open(AssistanceDialogComponent);

        dialogRef.componentInstance.accept.subscribe((date) => {
            this.students.forEach(student => {
                student.attendance.push({ date: date, status: 'present' });
            });
            this.isAssistanceTaken = true;
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    toggleAttendanceStatus(attendance: any): void {
        if (this.isAssistanceTaken) {
            attendance.status = attendance.status === 'present' ? 'absent' : 'present';
        }
    }

    saveAssistance(): void {

        localStorage.setItem('attendanceStudents', JSON.stringify(this.students));


        this.router.navigate(['/classrooms/courses/attendance']);
        this.isAssistanceTaken = false;
    }

    deleteAssistance(date: string): void {

        this.students.forEach(student => {
            student.attendance = student.attendance.filter(attendance => attendance.date !== date);
        });

        localStorage.setItem('attendanceStudents', JSON.stringify(this.students));
    }

}
