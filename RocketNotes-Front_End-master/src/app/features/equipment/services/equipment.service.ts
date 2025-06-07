import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Equipment} from "../equipment-list/equipment.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends BaseService<Equipment>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint ='/equipments'
  }
}
