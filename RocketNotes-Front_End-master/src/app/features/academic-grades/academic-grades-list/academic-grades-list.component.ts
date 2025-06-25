import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicGradesService, AcademicGrade } from '../../../core/services/academic-grades.service';
import { AcademicGradeDialogComponent } from '../academic-grade-dialog/academic-grade-dialog.component';

@Component({
  selector: 'app-academic-grades-list',
  templateUrl: './academic-grades-list.component.html',
  styleUrls: ['./academic-grades-list.component.css']
})
export class AcademicGradesListComponent implements OnInit {

  academicGrades: AcademicGrade[] = [];
  displayedColumns: string[] = ['name', 'level', 'section', 'capacity', 'currentSize', 'actions'];
  isLoading = false;

  constructor(
    private academicGradesService: AcademicGradesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAcademicGrades();
  }

  loadAcademicGrades(): void {
    this.isLoading = true;
    this.academicGradesService.getAll().subscribe({
      next: (grades) => {
        this.academicGrades = grades;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading academic grades:', error);
        this.snackBar.open('Error al cargar los grados académicos', 'Cerrar', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AcademicGradeDialogComponent, {
      width: '400px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createAcademicGrade(result);
      }
    });
  }

  openEditDialog(grade: AcademicGrade): void {
    const dialogRef = this.dialog.open(AcademicGradeDialogComponent, {
      width: '400px',
      data: { isEdit: true, grade: { ...grade } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && grade.id) {
        this.updateAcademicGrade(grade.id, result);
      }
    });
  }

  createAcademicGrade(gradeData: AcademicGrade): void {
    this.academicGradesService.create(gradeData).subscribe({
      next: (newGrade) => {
        this.academicGrades.push(newGrade);
        this.snackBar.open('Grado académico creado exitosamente', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Error creating academic grade:', error);
        this.snackBar.open('Error al crear el grado académico', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  updateAcademicGrade(id: number, gradeData: AcademicGrade): void {
    this.academicGradesService.update(id, gradeData).subscribe({
      next: (updatedGrade) => {
        const index = this.academicGrades.findIndex(g => g.id === id);
        if (index !== -1) {
          this.academicGrades[index] = updatedGrade;
        }
        this.snackBar.open('Grado académico actualizado exitosamente', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Error updating academic grade:', error);
        this.snackBar.open('Error al actualizar el grado académico', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  deleteAcademicGrade(grade: AcademicGrade): void {
    if (grade.id && confirm(`¿Estás seguro de que quieres eliminar el grado "${grade.name}"?`)) {
      this.academicGradesService.delete(grade.id).subscribe({
        next: () => {
          this.academicGrades = this.academicGrades.filter(g => g.id !== grade.id);
          this.snackBar.open('Grado académico eliminado exitosamente', 'Cerrar', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error deleting academic grade:', error);
          this.snackBar.open('Error al eliminar el grado académico', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
} 