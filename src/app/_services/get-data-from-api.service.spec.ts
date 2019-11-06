import { TestBed, inject } from '@angular/core/testing';

import { GetDataFromApiService } from './get-data-from-api.service';

describe('GetDataFromApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDataFromApiService]
    });
  });

  it('should be created', inject([GetDataFromApiService], (service: GetDataFromApiService) => {
    expect(service).toBeTruthy();
  }));
});
