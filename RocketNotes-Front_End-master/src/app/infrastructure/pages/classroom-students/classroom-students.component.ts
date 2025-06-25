// infrastructure/pages/classroom-capacity/classroom-capacity.component.ts
import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../services/students.service";
import {Student} from "../../model/student.entity";

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.css']
})
export class ClassroomStudentsComponent implements OnInit {
  dataSource: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'delete'];

  constructor(private studentService: StudentsService) {}

  ngOnInit() {
    this.studentService.getAll().subscribe({
      next: (data:any) => {

        this.dataSource = data;
      },
      error: (err: any) => console.error(err)
    });
  }



}
