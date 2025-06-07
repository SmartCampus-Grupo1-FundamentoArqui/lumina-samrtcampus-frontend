import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-grade-dialog',
    template: `
        <h1 mat-dialog-title>News Grade</h1>
        <div mat-dialog-content>
            <p>Are you sure you want to create a new grade for this Classroom A21 - G1A of the Communication course? </p>
        </div>
        <div mat-dialog-actions>
            <button class="Assist" mat-button cdkFocusInitial (click)="onAcceptClick()">Accept</button>
            <button class="Assist2" mat-button (click)="onNoClick()">Cancel</button>
        </div>
    `
    ,
    standalone: true
})
export class GradeDialogComponent {

    @Output() accept = new EventEmitter();

    constructor(public dialogRef: MatDialogRef<GradeDialogComponent>) {}



    onNoClick(): void {
        this.dialogRef.close();
    }

    onAcceptClick(): void {
        console.log('Accept button clicked');
        this.accept.emit();
        this.dialogRef.close();
    }
}
