import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDetailComponent } from './preview-detail.component';

describe('PreviewDetailComponent', () => {
  let component: PreviewDetailComponent;
  let fixture: ComponentFixture<PreviewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
