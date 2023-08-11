import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPaymentComponent } from './preview-payment.component';

describe('PreviewPaymentComponent', () => {
  let component: PreviewPaymentComponent;
  let fixture: ComponentFixture<PreviewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
