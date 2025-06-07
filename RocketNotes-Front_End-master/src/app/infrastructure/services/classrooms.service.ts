
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom } from '../model/classroom.entity';
import { BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})

export class ClassroomsService extends BaseService<Classroom> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/classrooms';
  }
}
