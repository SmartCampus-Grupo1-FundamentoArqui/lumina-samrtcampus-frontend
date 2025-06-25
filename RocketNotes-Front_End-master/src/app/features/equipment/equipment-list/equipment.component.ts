import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {BaseService} from "../../../shared/services/base.service";
import {EquipmentService} from "../services/equipment.service";
import {DialogStudentComponent} from "../../student/dialog-student/dialog-student.component";
import {EquipmentDialogComponent} from "../equipment-dialog/equipment-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface Equipment {
  equipmentId: string;
  name: string;
  quantity: string;
  budget: string;
  creation: string;
  period: string;
  state: string;
}

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit {
  displayedColumns: string[] = ['id','name','quantity','budget','creation','period','state']

  dataSource: Equipment[] = [];
  equipment: any={}
  constructor(private buttonStateService: ButtonStateService, private apiService: EquipmentService,public dialog: MatDialog) { }


  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton2');
    this.apiService.getAll().subscribe({
      next:(response: any)=>{
       this.dataSource = response
        console.log(this.dataSource)
      }
    })
  }
  onEditItem(object: any){

  }
  openDialog(){
    const dialogRef= this.dialog.open(EquipmentDialogComponent,{
      width: '600px',
      data:{
        name:this.equipment.name,
        quantity: this.equipment.quantity,
        creation: this.equipment.creation,
        budget: this.equipment.budget,
        state : this.equipment.state,
        period: this.equipment.period

      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.name!=null){
        let equipment1 ={
          name:result.name,
          type: result.type || 'General',
          status: result.state,
          location: result.location || 'Campus'
        }
        this.apiService.create(equipment1).subscribe({
              next:(response:any)=>{
                console.log(response);
              }
            }
        )

      }

    })
  }

}
