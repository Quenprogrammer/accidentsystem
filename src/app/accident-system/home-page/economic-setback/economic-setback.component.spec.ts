import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicSetbackComponent } from './economic-setback.component';

describe('EconomicSetbackComponent', () => {
  let component: EconomicSetbackComponent;
  let fixture: ComponentFixture<EconomicSetbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomicSetbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomicSetbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
