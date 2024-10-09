import { TestBed } from '@angular/core/testing';

import { BigDatainitService } from './big-datainit.service';

describe('BigDatainitService', () => {
  let service: BigDatainitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigDatainitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
