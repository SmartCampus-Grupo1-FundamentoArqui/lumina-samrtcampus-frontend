import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCreateFormComponent } from './classroom-create-form.component';

describe('ClassroomCreateFormComponent', () => {
  let component: ClassroomCreateFormComponent;
  let fixture: ComponentFixture<ClassroomCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassroomCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
