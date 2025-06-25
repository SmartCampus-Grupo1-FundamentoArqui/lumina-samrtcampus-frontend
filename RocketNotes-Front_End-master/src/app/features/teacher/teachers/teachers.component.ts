import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TeacherService} from "../service/teacher.service";
import {DialogTeacherComponent} from "../dialog-teacher/dialog-teacher.component";
export interface Teacher {
  studentId: string;
  name: string;
  studentCode: string;
  status: string;
  paternal: string;
  maternal: string;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {


  displayedColumns: string[] = ['id','name','teacherCode','action']

  dataSource: Teacher[] = [];
  teacher: any={}
  constructor( private apiTeacher: TeacherService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.apiTeacher.getAll().subscribe({
      next:(response: any)=>{
        this.dataSource = response
        console.log(this.dataSource)
      }
    })
  }
  onEditItem(object: any){
  }
  onDeleteItem(object: any){

  }
  openDialog(){
    const dialogRef= this.dialog.open(DialogTeacherComponent,{
      width: '600px',
      data:{
        name:this.teacher.name,
        dni: this.teacher.dni,
        phone:this.teacher.phone,
        address:this.teacher.address,
        email:this.teacher.email,
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.name!=null){
        let teacher1 ={
          name:result.name+" "+result.maternal+" "+result.paternal,
          dni: result.dni,
          phone:result.phone,
          address:result.address,
          email:result.email,
          teacherCode: "u20201b333@upc.edu.pe"
        }
        this.apiTeacher.create(teacher1).subscribe({
              next:(response:any)=>{
                console.log(response);
              }
            }
        )

      }

    })
  }



}
