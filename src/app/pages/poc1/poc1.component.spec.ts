import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { Poc1Component } from './poc1.component';
import { RouterModule } from '@angular/router';

describe('Poc1Component', () => {
  let component: Poc1Component;
  let fixture: ComponentFixture<Poc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Poc1Component ],
      imports: [HttpClientModule,[RouterModule.forRoot([])],MatDialogModule],
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
