import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poc1Component } from './poc1.component';

describe('Poc1Component', () => {
  let component: Poc1Component;
  let fixture: ComponentFixture<Poc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Poc1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Poc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
