import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmployee } from './card-employee';

describe('CardEmployee', () => {
  let component: CardEmployee;
  let fixture: ComponentFixture<CardEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(CardEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
