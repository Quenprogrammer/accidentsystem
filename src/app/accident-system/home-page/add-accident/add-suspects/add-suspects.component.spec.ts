import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuspectsComponent } from './add-suspects.component';

describe('AddSuspectsComponent', () => {
  let component: AddSuspectsComponent;
  let fixture: ComponentFixture<AddSuspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSuspectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
