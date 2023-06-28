import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerifyedComponent } from './otp-verifyed.component';

describe('OtpVerifyedComponent', () => {
  let component: OtpVerifyedComponent;
  let fixture: ComponentFixture<OtpVerifyedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerifyedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerifyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
