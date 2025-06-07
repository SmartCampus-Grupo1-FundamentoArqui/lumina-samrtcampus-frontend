import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-assistance-dialog',
    template: `
        <h1 mat-dialog-title>News Assistance</h1>
        <div mat-dialog-content>
            <p>Are you sure you want to create a new attendance for this Classroom A21 - G1A of the Communication
                course? This action is irreversible</p>
        </div>
        <div mat-dialog-actions>
            <button class="Assist" mat-button cdkFocusInitial (click)="onAcceptClick()">Accept</button>
            <button class="Assist2" mat-button (click)="onNoClick()">Cancel</button>
        </div>
    `
    ,
    standalone: true
})
export class AssistanceDialogComponent {

    @Output() accept = new EventEmitter();

    constructor(public dialogRef: MatDialogRef<AssistanceDialogComponent>) {}


    onNoClick(): void {
        this.dialogRef.close();
    }

    onAcceptClick(): void {
        this.accept.emit(new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
        this.dialogRef.close();
    }
}

