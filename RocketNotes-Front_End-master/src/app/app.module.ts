
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';

import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { ClassroomCapacityComponent } from './infrastructure/pages/classroom-capacity/classroom-capacity.component';
import { ClassroomCreateFormComponent } from './infrastructure/components/classroom-create-form/classroom-create-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ClassroomStudentsComponent} from "./infrastructure/pages/classroom-students/classroom-students.component";
import { ClassroomCoursesComponent } from './infrastructure/pages/classroom-courses/classroom-courses.component';
import { CoursesViewComponent} from "./infrastructure/pages/courses-view/courses-view.component";
import { CourseCreateFormComponent } from './infrastructure/components/course-create-form/course-create-form.component';
import { RegisterComponent } from './features/auth/register/register.component';
import {MatRadioModule} from "@angular/material/radio";
import { CourseDetailComponent } from './infrastructure/pages/course-detail/course-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ClassroomCreateFormComponent,
    ClassroomStudentsComponent,
    CoursesViewComponent,
    CourseCreateFormComponent,
    CourseDetailComponent,
    RegisterComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    }),
    MatRadioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
