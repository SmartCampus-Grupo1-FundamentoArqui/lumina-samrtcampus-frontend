import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogStudentComponent} from "../dialog-student/dialog-student.component";
import {StudentsService, Student} from "../service/students.service";
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id','name','studentCode','status','action']

  dataSource: Student[] = [];
  student: any={}
  constructor( private apiStudent: StudentsService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.apiStudent.getAll().subscribe({
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
    const dialogRef= this.dialog.open(DialogStudentComponent,{
      width: '600px',
      data:{
        name:this.student.name,
        studentCode: this.student.studentCode,
        status : 'Enrolled',

      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.name!=null){
        let student1 ={
          name:result.name+" "+result.maternal+" "+result.paternal,
          email: result.email || `${result.studentCode}@student.upc.edu.pe`,
          studentCode:result.studentCode,
          program: result.program || 'General',
          semester: result.semester || 1
        }
        this.apiStudent.create(student1).subscribe({
              next:(response:any)=>{
                console.log(response);
              }
            }
        )

      }

    })
  }


}