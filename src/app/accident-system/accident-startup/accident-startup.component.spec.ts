import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentStartupComponent } from './accident-startup.component';

describe('AccidentStartupComponent', () => {
  let component: AccidentStartupComponent;
  let fixture: ComponentFixture<AccidentStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentStartupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
