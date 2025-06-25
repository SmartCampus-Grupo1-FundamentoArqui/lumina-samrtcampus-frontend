import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AssistanceDialogComponent} from "./assistance-dialog.component";
import { Router } from '@angular/router';

interface AttendanceRecord {
    date: string;
    status: 'present' | 'absent';
}

interface StudentAttendance {
    name: string;
    attendance: AttendanceRecord[];
}

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


         students: StudentAttendance[] = [];

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

    toggleAttendanceStatus(attendance: AttendanceRecord): void {
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
            student.attendance = student.attendance.filter((attendance: AttendanceRecord) => attendance.date !== date);
        });

        localStorage.setItem('attendanceStudents', JSON.stringify(this.students));
    }

}
