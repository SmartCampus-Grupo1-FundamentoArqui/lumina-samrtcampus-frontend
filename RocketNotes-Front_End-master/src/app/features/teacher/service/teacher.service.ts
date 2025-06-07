import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Teacher} from "../teachers/teachers.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher>{


  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/teachers';
  }
}
