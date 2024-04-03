import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuElectronicaComponent } from './seu-electronica.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

describe('SeuElectronicaComponent', () => {
  let component: SeuElectronicaComponent;
  let fixture: ComponentFixture<SeuElectronicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeuElectronicaComponent ],
      imports: [HttpClientModule,[RouterModule.forRoot([])],MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuElectronicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
