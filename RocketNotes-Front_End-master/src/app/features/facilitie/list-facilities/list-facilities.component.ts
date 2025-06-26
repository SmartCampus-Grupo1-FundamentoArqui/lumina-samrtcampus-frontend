import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { FacilitieService, Facility } from '../service/facilitie.service';
import { FacilitieDialogComponent } from '../facilitie-dialog/facilitie-dialog.component';

@Component({
  selector: 'app-list-facilities',
  templateUrl: './list-facilities.component.html',
  styleUrls: ['./list-facilities.component.css']
})
export class ListFacilitiesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'budget',
    'creation',
    'finalization',
    'period',
    'state',
    'actions'
  ];
  
  dataSource: Facility[] = [];

  constructor(
    private dialog: MatDialog,
    private facilitieService: FacilitieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.facilitieService.getAll().subscribe({
      next: (facilities) => {
        this.dataSource = facilities;
        if (this.table) {
          this.table.renderRows();
        }
      },
      error: (error) => {
        console.error('Error loading facilities:', error);
        this.snackBar.open('Error loading facilities', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FacilitieDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facilitieService.create(result).subscribe({
          next: () => {
            this.loadFacilities();
            this.snackBar.open('Facility created successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: (error) => {
            console.error('Error creating facility:', error);
            this.snackBar.open('Error creating facility', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        });
      }
    });
  }

  deleteFacility(id: number): void {
    if (confirm('Are you sure you want to delete this facility?')) {
      this.facilitieService.delete(id).subscribe({
        next: () => {
          this.loadFacilities();
          this.snackBar.open('Facility deleted successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Error deleting facility:', error);
          this.snackBar.open('Error deleting facility', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}
