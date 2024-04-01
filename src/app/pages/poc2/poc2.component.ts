import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-poc2',
  templateUrl: './poc2.component.html',
  styleUrls: ['./poc2.component.scss']
})
export class Poc2Component implements OnInit {
  selectedTipo: any;
  selectedFile: File | undefined;
  selectedOption: any;
  jsonResponse: any;
  responseMessage: any = {};
  formData = new FormData();
  hiddenResponse = false;

  constructor(private router: Router, private apiService: ApiService,private _snackBar: MatSnackBar) {
    //this.selectedOption = this.pocs[0].value;
  }

  ngOnInit(): void {
    this.selectedOption = 'poc2';
    this.apiService.setSelectedOption(this.selectedOption);
  }

  pocs = [
    {value: 'poc1', viewValue: 'PoC 1: Buscador Universal'},
    {value: 'poc2', viewValue: 'PoC 2: Análisis de documentos'},

  ];
  // onSelectionChange(selectedValue: string) {
  //   this.selectedOption = selectedValue;
  //   console.log('Valor seleccionado:', this.selectedOption);
  //   if(this.selectedOption == "poc1"){
  //     //console.log('soy poc1111111111111')
  //     this.router.navigate(['/poc1']);
  //   }
  // }
  onSelectionChange(selectedValue: string) {
    if (selectedValue === 'poc1') {
      this.router.navigate(['/poc1']);
    }
  }

  tipos = [
    {value: 'ninguna', viewValue: 'Ninguna'},
    {value: 'resolucion', viewValue: 'Resolución'},
    {value: 'demanda', viewValue: 'Demanda'},

  ];
  onSelectionTipo(selectedValue: string) {
    this.selectedTipo = selectedValue;
    console.log('Valor selectedTipo:', this.selectedTipo);

  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

      if (this.selectedFile) {
        this.convertToBlob(this.selectedFile);
        //console.log('Archivo seleccionado:', this.selectedFile);
      }else{
        this._snackBar.open('No se ha seleccionado ningún documento', 'Cerrar', {
          duration: 4000
        });
      }
  }
  convertToBlob(file: File) {
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const blob = new Blob([arrayBuffer], { type: file.type });
      this.handleBlob(blob);
    };

    fileReader.readAsArrayBuffer(file);
  }

  handleBlob(blob: Blob) {
    // Aquí puedes utilizar el objeto Blob como desees
    this.formData.append('archivo',blob);
    //console.log(blob);
  }

  processMessageResolucion(message: string){

    if(this.selectedTipo === 'resolucion'){
      this.formData.append('tipo',this.selectedTipo);
     this.apiService.processMessageResolucion(this.formData).subscribe(response => {
      if(this.responseMessage){
        this.responseMessage = response;
        //console.log('HAS SELECCIONADO RESOLUCION',this.responseMessage);
        this.hiddenResponse = true
      }
     });
    }else{
      //console.log('HAS SELECCIONADO DEMANDA');
    }
    (    error: any) => {
      console.error('Error al recibir los datos:', error);
    }
   }
}
