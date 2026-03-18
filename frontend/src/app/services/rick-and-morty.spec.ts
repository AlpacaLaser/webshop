import { TestBed } from '@angular/core/testing';

import { RickAndMorty } from './rick-and-morty';

describe('RickAndMorty', () => {
  let service: RickAndMorty;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickAndMorty);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
