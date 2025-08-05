import { TestBed } from '@angular/core/testing';

import { AccidentSessionService } from './accident-session.service';

describe('AccidentSessionService', () => {
  let service: AccidentSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccidentSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
