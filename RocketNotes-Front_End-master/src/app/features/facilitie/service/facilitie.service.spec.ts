import { TestBed } from '@angular/core/testing';

import { FacilitieService } from './facilitie.service';

describe('FacilitieService', () => {
  let service: FacilitieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilitieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
