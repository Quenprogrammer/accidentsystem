import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DB } from './db';

describe('DB', () => {
  let component: DB;
  let fixture: ComponentFixture<DB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
