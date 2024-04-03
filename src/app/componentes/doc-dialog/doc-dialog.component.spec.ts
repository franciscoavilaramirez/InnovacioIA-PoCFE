import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDialogComponent } from './doc-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';



describe('DocDialogComponent', () => {
  let component: DocDialogComponent;
  let fixture: ComponentFixture<DocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDialogComponent ],
      imports: [MatDialogModule],
      providers: [
        // Aquí proporcionamos un stub para MatDialogRef
        { provide: MatDialogRef, useValue: MatDialogRef },
        // Si tu componente utiliza MAT_DIALOG_DATA, también necesitarás proporcionar un valor para ello
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
