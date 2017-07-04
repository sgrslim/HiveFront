import { TestBed, inject } from '@angular/core/testing';

import { CustomercodeInfoService } from './customercode-info.service';

describe('CustomercodeInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomercodeInfoService]
    });
  });

  it('should be created', inject([CustomercodeInfoService], (service: CustomercodeInfoService) => {
    expect(service).toBeTruthy();
  }));
});
