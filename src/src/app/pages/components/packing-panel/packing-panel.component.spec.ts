import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingPanelComponent } from './packing-panel.component';

describe('PackingPanelComponent', () => {
  let component: PackingPanelComponent;
  let fixture: ComponentFixture<PackingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
