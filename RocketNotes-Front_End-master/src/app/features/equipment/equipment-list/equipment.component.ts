import { Component, OnInit } from '@angular/core';
import { ButtonStateService } from "../../maintenance/ButtonStateService";
import { EquipmentService, Equipment, CreateEquipmentDto } from "../services/equipment.service";
import { EquipmentDialogComponent } from "../equipment-dialog/equipment-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'budget', 'creation', 'finalization', 'period', 'state'];
  dataSource: Equipment[] = [];

  constructor(
    private buttonStateService: ButtonStateService,
    private apiService: EquipmentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton2');
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.apiService.getAll().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        console.error('Error fetching equipments:', error);
        this.showMessage('Error al cargar los equipos');
      }
    });
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }
  onEditItem(object: any){

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      width: '600px',
      data: {
        name: '',
        quantity: 0,
        budget: 0,
        period: 0
      } as CreateEquipmentDto
    });

    dialogRef.afterClosed().subscribe((result?: CreateEquipmentDto) => {
      if (result?.name) {
        const newEquipment: CreateEquipmentDto = {
          name: result.name,
          quantity: Number(result.quantity),
          budget: Number(result.budget),
          period: Number(result.period)
        };

        this.apiService.create(newEquipment).subscribe({
          next: (_) => {
            this.showMessage('Equipo creado exitosamente');
            this.loadEquipments();
          },
          error: (error) => {
            console.error('Error creating equipment:', error);
            this.showMessage('Error al crear el equipo');
          }
        });
      }
    });
  }

}
