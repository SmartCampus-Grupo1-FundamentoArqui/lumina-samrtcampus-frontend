import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCapacityComponent } from './classroom-capacity.component';

describe('ClassroomCapacityComponent', () => {
  let component: ClassroomCapacityComponent;
  let fixture: ComponentFixture<ClassroomCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomCapacityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassroomCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
