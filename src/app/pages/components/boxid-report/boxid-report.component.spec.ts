import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxidReportComponent } from './boxid-report.component';

describe('BoxidReportComponent', () => {
  let component: BoxidReportComponent;
  let fixture: ComponentFixture<BoxidReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxidReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
