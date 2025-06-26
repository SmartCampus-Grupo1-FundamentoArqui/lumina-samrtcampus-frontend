import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


import { CreateEquipmentDto } from '../services/equipment.service';
@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.css']
})
export class EquipmentDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EquipmentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CreateEquipmentDto
      ) { }

  onNoClick():void{
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log("uwu")
  }

}
