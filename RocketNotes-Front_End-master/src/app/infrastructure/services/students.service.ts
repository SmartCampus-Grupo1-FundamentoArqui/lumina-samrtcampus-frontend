
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService} from "../../shared/services/base.service";
import {Student} from "../model/student.entity";

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends BaseService<Student> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/students';
  }

}
