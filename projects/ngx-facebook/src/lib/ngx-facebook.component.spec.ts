import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFacebookComponent } from './ngx-facebook.component';

describe('NgxFacebookComponent', () => {
  let component: NgxFacebookComponent;
  let fixture: ComponentFixture<NgxFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
