import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Poc2Component } from './poc2.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

describe('Poc2Component', () => {
  let component: Poc2Component;
  let fixture: ComponentFixture<Poc2Component>;
  let apiService: ApiService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Poc2Component ],
      imports: [HttpClientModule,[RouterModule.forRoot([])],MatSnackBarModule],
      providers: [ApiService]
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
  it('should initialize component', () => {
    expect(component.selectedOption).toEqual('poc2-analisis');
    expect(component.selectedTipo).toBeUndefined();
    expect(component.selectedFile).toBeUndefined();
    expect(component.hiddenResponse).toBeFalse();
  });
  it('should update selectedTipo on selection', () => {
    const selectedTipo = 'resolucion';
    component.onSelectionTipo(selectedTipo);
    expect(component.selectedTipo).toEqual(selectedTipo);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(Poc2Component);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Inyectamos el servicio
    fixture.detectChanges();
  });

  it('should update selectedFile and call convertToBlob correctly', () => {
    const testFile = new File(['file content'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [testFile] } };
    spyOn(component, 'convertToBlob').and.callThrough();

    component.onFileChange(event);

    expect(component.selectedFile).toBe(testFile);
    expect(component.convertToBlob).toHaveBeenCalledWith(testFile);
  });

  it('should call apiService with correct FormData when selectedTipo is "resolucion"', () => {
    const testFile = new File(['file content'], 'test.txt', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('archivo', testFile);

    component.formData = formData;
    component.selectedTipo = 'resolucion';

    spyOn(apiService, 'processMessageResolucion').and.returnValue(of({}));

    component.processMessageResolucion('Simulated test message');

    expect(apiService.processMessageResolucion).toHaveBeenCalledWith(formData);
  });

  it('should handle empty response from API', fakeAsync(() => {
    spyOn(apiService, 'processMessageResolucion').and.returnValue(of(null)); // Simulate empty response

    component.processMessageResolucion('Test message');

    tick(); // Wait for async operations to complete

    expect(component.responseMessage).toEqual({});
    expect(component.hiddenResponse).toBeFalsy();
  }));


  it('should handle valid response from API', fakeAsync(() => {
    const mockResponse = { /* Mock valid response from API */ };
    spyOn(apiService, 'processMessageResolucion').and.returnValue(of(mockResponse)); // Simulate valid response

    component.processMessageResolucion('Test message');

    tick(); // Wait for async operations to complete

    expect(component.responseMessage).toEqual(mockResponse);
    expect(component.hiddenResponse).toBeFalse();
  }));


});


