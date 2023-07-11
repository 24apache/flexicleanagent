import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvoceComponent } from './customer-invoce.component';

describe('CustomerInvoceComponent', () => {
  let component: CustomerInvoceComponent;
  let fixture: ComponentFixture<CustomerInvoceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInvoceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInvoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
