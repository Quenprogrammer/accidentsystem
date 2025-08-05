import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuspect } from './add-suspect';

describe('AddSuspect', () => {
  let component: AddSuspect;
  let fixture: ComponentFixture<AddSuspect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSuspect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuspect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
