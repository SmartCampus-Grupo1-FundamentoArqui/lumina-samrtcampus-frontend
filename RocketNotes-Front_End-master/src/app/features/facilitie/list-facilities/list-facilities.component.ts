import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {FacilitieService} from "../service/facilitie.service";
import {DialogFacilitieComponent} from "../dialog-facilitie/dialog-facilitie.component";
import {MatDialog} from "@angular/material/dialog";


export interface Facilitie {
  name: string;
  description: string;
  budget: string;
  creation: string;
  period: string;
  state: string;
}

@Component({
  selector: 'app-list-facilities',
  templateUrl: './list-facilities.component.html',
  styleUrls: ['./list-facilities.component.css']
})
export class ListFacilitiesComponent implements OnInit {
  displayedColumns: string[] = ['id','name','description','budget','creation','period','state']

  dataSource: Facilitie[] = [];
  facilitie: any={}
  constructor(private buttonStateService: ButtonStateService, private apiService: FacilitieService,public dialog: MatDialog) { }


  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton1');
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
    const dialogRef= this.dialog.open(DialogFacilitieComponent,{
      width: '600px',
      data:{
        name:this.facilitie.name,
        description: this.facilitie.description,
        budget: this.facilitie.budget,
        creation: this.facilitie.creation,
        period: this.facilitie.period,
        state : this.facilitie.state

      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.name!=null){
        let facilite1 ={
          name:result.name,
          type: result.type || 'General',
          capacity: result.capacity || 0,
          status: result.state,
          location: result.location || 'Campus'
        }
        this.apiService.create(facilite1).subscribe({
              next:(response:any)=>{
                console.log(response);
              }
            }
        )

      }

    })
  }


}
