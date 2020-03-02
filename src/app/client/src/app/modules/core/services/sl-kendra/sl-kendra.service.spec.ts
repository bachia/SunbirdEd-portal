import { TestBed, inject } from '@angular/core/testing';

import { SlKendraService } from './sl-kendra.service';

describe('SlKendraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlKendraService]
    });
  });

  it('should be created', inject([SlKendraService], (service: SlKendraService) => {
    expect(service).toBeTruthy();
  }));
});
