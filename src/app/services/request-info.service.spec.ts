import { TestBed, inject } from '@angular/core/testing';

import { RequestInfoService } from './request-info.service';

describe('RequestInfoserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestInfoService]
    });
  });

  it('should be created', inject([RequestInfoService], (service: RequestInfoService) => {
    expect(service).toBeTruthy();
  }));
});
