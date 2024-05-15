import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PODReportPage } from './podreport.page';

describe('PODReportPage', () => {
  let component: PODReportPage;
  let fixture: ComponentFixture<PODReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PODReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
