import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
export interface Student{
name: string
studentCode: string
status: string
paternal: string
maternal: string


}
@Component({
  selector: 'app-dialog-student',
  templateUrl: './dialog-student.component.html',
  styleUrls: ['./dialog-student.component.css']
})
export class DialogStudentComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<DialogStudentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Student) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log("")
  }

}
