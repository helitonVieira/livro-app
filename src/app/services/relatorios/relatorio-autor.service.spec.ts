import { TestBed } from '@angular/core/testing';

import { RelAutorService } from './rel.autor.service';

describe('RelAutorService', () => {
  let service: RelAutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelAutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
