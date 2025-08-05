import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentByStateComponent } from './accident-by-state.component';

describe('AccidentByStateComponent', () => {
  let component: AccidentByStateComponent;
  let fixture: ComponentFixture<AccidentByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentByStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
