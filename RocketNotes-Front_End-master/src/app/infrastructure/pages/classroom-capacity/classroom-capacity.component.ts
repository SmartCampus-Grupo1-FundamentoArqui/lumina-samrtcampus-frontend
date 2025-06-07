// infrastructure/pages/classroom-capacity/classroom-capacity.component.ts
import { Component, OnInit } from '@angular/core';
import { Classroom } from '../../model/classroom.entity';
import { ClassroomsService } from '../../services/classrooms.service';
import {MatDialog} from "@angular/material/dialog";
import {ClassroomCreateFormComponent} from "../../components/classroom-create-form/classroom-create-form.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-classroom-capacity',
  templateUrl: './classroom-capacity.component.html',
  styleUrls: ['./classroom-capacity.component.css']
})
export class ClassroomCapacityComponent implements OnInit {
  dataSource: Classroom[] = [];
  displayedColumns: string[] = ['section', 'classroom', 'capacity', 'enrolled_students', 'addStudent'];

  constructor(private classroomService: ClassroomsService, public dialog: MatDialog,private router: Router) {}

  ngOnInit() {

    this.classroomService.get().subscribe({
      next: (data: any) => {

        this.dataSource = data;
      },
      error: (err) => console.error(err)
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ClassroomCreateFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  navigateToAddStudent() {
    this.router.navigate(['/students']);
  }

}
