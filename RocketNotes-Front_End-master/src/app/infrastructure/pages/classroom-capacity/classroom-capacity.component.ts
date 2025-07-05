// infrastructure/pages/classroom-capacity/classroom-capacity.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Classroom } from '../../model/classroom.entity';
import { ClassroomsService } from '../../services/classrooms.service';
import { MatDialog } from "@angular/material/dialog";
import { ClassroomCreateFormComponent } from "../../components/classroom-create-form/classroom-create-form.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classroom-capacity',
  templateUrl: './classroom-capacity.component.html',
  styleUrls: ['./classroom-capacity.component.css']
})
export class ClassroomCapacityComponent implements OnInit {
  dataSource: Classroom[] = [];
  displayedColumns: string[] = ['section', 'classroom', 'grade', 'gradeId', 'capacity', 'currentSize', 'availability', 'actions'];
  isLoading = false;

  constructor(
    private classroomService: ClassroomsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadClassrooms();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ClassroomCreateFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true // Evitar cierre accidental
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Usar setTimeout para evitar el error de detección de cambios
        setTimeout(() => {
          this.loadClassrooms();
        }, 0);
      }
    });
  }

  editClassroom(classroom: Classroom): void {
    const dialogRef = this.dialog.open(ClassroomCreateFormComponent, {
      width: '550px',
      data: { 
        editMode: true, 
        classroom: classroom 
      },
      disableClose: true
    });

    dialogRef.componentInstance.editMode = true;
    dialogRef.componentInstance.classroom = classroom;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.loadClassrooms();
        }, 0);
      }
    });
  }

  deleteClassroom(classroom: Classroom): void {
    if (confirm(`¿Está seguro de que desea eliminar el aula ${classroom.section} - ${classroom.roomNumber}?`)) {
      this.classroomService.delete(classroom.id.toString()).subscribe({
        next: () => {
          this.snackBar.open('Aula eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          setTimeout(() => {
            this.loadClassrooms();
          }, 0);
        },
        error: (err) => {
          console.error('Error deleting classroom:', err);
          this.snackBar.open('Error al eliminar el aula', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getAvailabilityText(classroom: Classroom): string {
    const percentage = (classroom.currentSize / classroom.capacity) * 100;
    if (percentage < 80) {
      return 'Available';
    } else if (percentage < 100) {
      return 'Almost Full';
    } else {
      return 'Full';
    }
  }

  private loadClassrooms() {
    this.isLoading = true;
    this.classroomService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = data;
        this.isLoading = false;
        // Forzar detección de cambios después de cargar los datos
        this.cdr.detectChanges();
        console.log('Classrooms loaded with grade data:', data);
      },
      error: (err: any) => {
        console.error('Error loading classrooms:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
