import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingManifestComponent } from './packing-manifest.component';

describe('PackingManifestComponent', () => {
  let component: PackingManifestComponent;
  let fixture: ComponentFixture<PackingManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingManifestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
