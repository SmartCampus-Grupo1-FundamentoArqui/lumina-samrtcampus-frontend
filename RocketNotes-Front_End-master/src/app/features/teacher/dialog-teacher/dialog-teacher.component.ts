import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface Teacher{
  id?: number;
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  email: string;
  phone: string;
  password: string;
}

@Component({
  selector: 'app-dialog-teacher',
  templateUrl: './dialog-teacher.component.html',
  styleUrls: ['./dialog-teacher.component.css']
})
export class DialogTeacherComponent implements OnInit {
  
  isEditMode: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<DialogTeacherComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Teacher) { 
    
    // Si los datos tienen valores, estamos en modo edición
    this.isEditMode = !!(data.firstName || data.lastNameFather || data.lastNameMother || data.email || data.phone);
  }

  onNoClick():void{
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    console.log("Dialog initialized in", this.isEditMode ? "Edit" : "Create", "mode");
  }

}
