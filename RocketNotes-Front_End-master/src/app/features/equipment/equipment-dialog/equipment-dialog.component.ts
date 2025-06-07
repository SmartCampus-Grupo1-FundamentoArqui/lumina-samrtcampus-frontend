import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface Equipment {
  name: string
  quantity: string
  budget: string
  creation: string
  period: string
  state: string
}
@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.css']
})
export class EquipmentDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EquipmentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:Equipment
      ) { }

  onNoClick():void{
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log("uwu")
  }

}
