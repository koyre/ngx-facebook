import { TestBed } from '@angular/core/testing';

import { NgxFacebookService } from './ngx-facebook.service';

describe('NgxFacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFacebookService = TestBed.get(NgxFacebookService);
    expect(service).toBeTruthy();
  });
});
