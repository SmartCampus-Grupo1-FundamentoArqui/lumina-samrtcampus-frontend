import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base.service";
import {Facilitie} from "../list-facilities/list-facilities.component";

@Injectable({
  providedIn: 'root'
})
export class FacilitieService  extends BaseService<Facilitie>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint= '/facilities';

  }
}
