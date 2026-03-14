import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickAndMorty } from './rick-and-morty';

describe('RickAndMorty', () => {
  let component: RickAndMorty;
  let fixture: ComponentFixture<RickAndMorty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickAndMorty],
    }).compileComponents();

    fixture = TestBed.createComponent(RickAndMorty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
