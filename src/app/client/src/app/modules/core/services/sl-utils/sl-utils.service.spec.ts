import { TestBed, inject } from '@angular/core/testing';

import { SlUtilsService } from './sl-utils.service';

describe('SlUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlUtilsService]
    });
  });

  it('should be created', inject([SlUtilsService], (service: SlUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
