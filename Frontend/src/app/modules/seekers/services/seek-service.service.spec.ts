import { TestBed } from '@angular/core/testing';

import { SeekServiceService } from './seek-service.service';

describe('SeekServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeekServiceService = TestBed.get(SeekServiceService);
    expect(service).toBeTruthy();
  });
});
