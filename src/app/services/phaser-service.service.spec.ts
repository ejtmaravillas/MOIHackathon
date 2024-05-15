import { TestBed } from '@angular/core/testing';

import { PhaserServiceService } from './phaser-service.service';

describe('PhaserServiceService', () => {
  let service: PhaserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaserServiceService);
  });

  it('should be created', () => {
    const service: PhaserServiceService = TestBed.get(PhaserServiceService)
    expect(service).toBeTruthy();
  });
});
