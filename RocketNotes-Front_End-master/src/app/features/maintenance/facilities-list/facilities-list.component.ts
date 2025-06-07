import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../ButtonStateService";

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.css']
})
export class FacilitiesListComponent implements OnInit {
  activeButton: string | null = null;

  constructor(private buttonStateService: ButtonStateService) { }

  ngOnInit(): void {
    this.buttonStateService.getActiveButton().subscribe(button => {
      this.activeButton = button;
    });
  }
  buttonActivated(button: string) {
    this.activeButton = button;
    this.buttonStateService.setActiveButton(button);
  }

}
