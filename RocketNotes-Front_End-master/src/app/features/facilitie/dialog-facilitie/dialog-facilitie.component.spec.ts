import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFacilitieComponent } from './dialog-facilitie.component';

describe('DialogFacilitieComponent', () => {
  let component: DialogFacilitieComponent;
  let fixture: ComponentFixture<DialogFacilitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFacilitieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFacilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
