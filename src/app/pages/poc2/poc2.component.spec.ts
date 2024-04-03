import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poc2Component } from './poc2.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('Poc2Component', () => {
  let component: Poc2Component;
  let fixture: ComponentFixture<Poc2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Poc2Component ],
      imports: [HttpClientModule,[RouterModule.forRoot([])],MatSnackBarModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Poc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
