import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentsReportsComponent } from './accidents-reports.component';

describe('AccidentsReportsComponent', () => {
  let component: AccidentsReportsComponent;
  let fixture: ComponentFixture<AccidentsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentsReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
