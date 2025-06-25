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
    this.loadClassrooms();
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ClassroomCreateFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Recargar la lista cuando se cierre el modal y se haya creado algo
        this.loadClassrooms();
      }
    });
  }

  private loadClassrooms() {
    this.classroomService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = data;
        console.log('Aulas cargadas:', data);
      },
      error: (err: any) => console.error('Error cargando aulas:', err)
    });
  }
  navigateToAddStudent() {
    this.router.navigate(['/students']);
  }

}
