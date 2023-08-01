import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHourComponent } from './company-hour.component';

describe('CompanyHourComponent', () => {
  let component: CompanyHourComponent;
  let fixture: ComponentFixture<CompanyHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
