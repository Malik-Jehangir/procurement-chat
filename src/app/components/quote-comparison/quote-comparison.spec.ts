import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComparison } from './quote-comparison';

describe('QuoteComparison', () => {
  let component: QuoteComparison;
  let fixture: ComponentFixture<QuoteComparison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteComparison],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComparison);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
