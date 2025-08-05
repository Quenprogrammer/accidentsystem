import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficres } from './add-officres';

describe('AddOfficres', () => {
  let component: AddOfficres;
  let fixture: ComponentFixture<AddOfficres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfficres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
