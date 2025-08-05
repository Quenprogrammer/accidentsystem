import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficers } from './view-officers';

describe('ViewOfficers', () => {
  let component: ViewOfficers;
  let fixture: ComponentFixture<ViewOfficers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOfficers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
