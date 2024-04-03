import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Poc1Component } from './poc1.component';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';


describe('Poc1Component', () => {
  let component: Poc1Component;
  let fixture: ComponentFixture<Poc1Component>;
  let mockDialog: MatDialog;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']); // Inicializar mockDialog

    await TestBed.configureTestingModule({
      declarations: [ Poc1Component ],
      imports: [HttpClientModule,[RouterModule.forRoot([])],MatDialogModule],
      providers: [{ provide: MatDialog, useValue: mockDialog }]
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
  // it('should open doc dialog', () => {
  //   const referencia = '[doc1]';
  //   const textoAsociado = 'Texto asociado a doc1';
  //   const filepath = 'path/to/doc1';
  //   const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']); // Crear objeto simulado para MatDialogRef
  //   (mockDialog.open as jasmine.Spy).and.returnValue(dialogRefSpyObj);

  //   component.openDocDialog(referencia);

  //   expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
  //     width: '70vw',
  //     height: '85vh',
  //     autoFocus: false,
  //     data: {
  //       texto: textoAsociado,
  //       filepath: filepath
  //     }
  //   });
  // });
});
