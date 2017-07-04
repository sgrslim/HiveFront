import { TestBed, inject } from '@angular/core/testing';

import { GeneratorInfoService } from './generator-info.service';

describe('GeneratorInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratorInfoService]
    });
  });

  it('should be created', inject([GeneratorInfoService], (service: GeneratorInfoService) => {
    expect(service).toBeTruthy();
  }));
});
