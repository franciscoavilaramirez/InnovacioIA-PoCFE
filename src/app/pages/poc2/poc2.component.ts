import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-poc2',
  templateUrl: './poc2.component.html',
  styleUrls: ['./poc2.component.scss']
})
export class Poc2Component implements OnInit {

  selectedFile: File | null = null;
  selectedOption: any;



  constructor(private router: Router, private apiService: ApiService) {
    this.selectedOption = this.pocs[0].value;

  }

  ngOnInit(): void {
  }

  pocs = [
    {value: 'poc1', viewValue: 'PoC 1: Buscador Universal'},
    {value: 'poc2', viewValue: 'PoC 2: Análisis de documentos'},

  ];
  onSelectionChange(selectedValue: string) {
    this.selectedOption = selectedValue;
    console.log('Valor seleccionado:', selectedValue);
    if(selectedValue == "poc1"){
      //console.log('soy poc1111111111111')
      this.router.navigate(['/poc1']);
    }
  }
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log('Archivo seleccionado:', file);
  //     // Aquí puedes agregar el código para procesar el archivo, como enviarlo a un servicio para subirlo al servidor
  //   }
  // }
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log('Archivo seleccionado:', file);
  //     this.uploadFileToServer(file);
  //   }
  // }
  onFileChange(event: any) {
  this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  uploadFileToServer() {
    if (this.selectedFile) {
      this.apiService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log('Archivo subido exitosamente:', response);
          // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al subir el archivo:', error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        }
      );
    } else {
      console.error('No se ha seleccionado ningún archivo.');
      // Aquí puedes mostrar un mensaje de error al usuario indicando que debe seleccionar un archivo antes de procesar.
    }
  }
}