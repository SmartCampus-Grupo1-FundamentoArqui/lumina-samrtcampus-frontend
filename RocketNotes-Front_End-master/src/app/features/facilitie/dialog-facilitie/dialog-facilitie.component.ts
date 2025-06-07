import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface Facilitie{
  name: string
  description:string
  budget:string
  creation:string
  period: string
  state: string
}
@Component({
  selector: 'app-dialog-facilitie',
  templateUrl: './dialog-facilitie.component.html',
  styleUrls: ['./dialog-facilitie.component.css']
})
export class DialogFacilitieComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<DialogFacilitieComponent>,
      @Inject(MAT_DIALOG_DATA) public data:Facilitie
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
}
  ngOnInit():void{
     console.log("a")
  }

}
