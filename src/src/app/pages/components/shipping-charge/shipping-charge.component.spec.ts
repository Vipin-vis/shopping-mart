import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingChargeComponent } from './shipping-charge.component';

describe('ShippingChargeComponent', () => {
  let component: ShippingChargeComponent;
  let fixture: ComponentFixture<ShippingChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
