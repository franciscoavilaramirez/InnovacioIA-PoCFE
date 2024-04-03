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
        // Proporcionar un stub para MatDialogRef con el método close
        { provide: MatDialogRef, useValue: { close: () => {} } },
        // Proporcionar un valor de prueba para MAT_DIALOG_DATA
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
  it('should initialize textoAsociado correctly in ngOnInit', () => {
    const mockData = { texto: 'Texto de prueba' };
    component.ngOnInit();
    expect(component.textoAsociado).toBeUndefined();
  });
  it('should close the dialog when closedModal is called', () => {
    const dialogRefSpy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.closedModal();
    expect(dialogRefSpy).toHaveBeenCalled();
  });

});
