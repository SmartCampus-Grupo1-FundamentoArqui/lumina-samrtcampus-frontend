import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Course} from "../model/course.entity";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  private exampleCourses: Course[] = [
    {
      id: '1',
      room: 'Room 101',
      course: 'Mathematics',
      start_time: '09:00',
      end_time: '10:30',
      days: 'Mon, Wed, Fri',
      teacher: 'John Doe',
      image_url: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      room: 'Room 102',
      course: 'Physics',
      start_time: '10:30',
      end_time: '12:00',
      days: 'Tue, Thu',
      teacher: 'Jane Smith',
      image_url: 'https://via.placeholder.com/150'
    }
  ];

  constructor() { }

  getAll(): Observable<Course[]> {
    return of(this.exampleCourses);
  }

  getCourseById(id: string): Observable<Course> {
    const course = this.exampleCourses.find(c => c.id === id);
    return of(course || {} as Course);
  }

}
