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
  tipos = [
    {value: 'resolucion', viewValue: 'Resolución'},
    {value: 'demanda', viewValue: 'Demanda'},

  ];
  onSelectionTipo(selectedValue: string) {
    this.selectedTipo = selectedValue;
    console.log('Valor selectedTipo:', selectedValue);
    // if(selectedValue == "resolucion"){
    //   console.log('soy resolucion:', selectedValue);
    // }
  }
  onFileChange(event: any) {
  this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.convertToBlob(this.selectedFile);
      console.log('Archivo seleccionado:', this.selectedFile);
    }else{
      this._snackBar.open('No se ha seleccionado ningún archivo', 'Cerrar', {
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
    console.log(blob);
  }

  processMessageResolucion(message: string){

    if(this.selectedTipo === 'resolucion'){
      this.formData.append('tipo',this.selectedTipo);
     this.apiService.processMessageResolucion(this.formData).subscribe(response => {
      if(this.responseMessage){
        this.responseMessage = response;
        console.log('HAS SELECCIONADO RESOLUCION',this.responseMessage);
        this.hiddenResponse = true
      }


     });
    }else{
      console.log('HAS SELECCIONADO DEMANDA');

    }
    (    error: any) => {
      console.error('Error al recibir los datos:', error);
    }
   }
   prueba(){
    this.jsonResponse = this.json;
    console.log(this.jsonResponse);

   }
    json =
   {
    "articulo": [
      "173.2",
      "153.2",
      "153.3",
      "148.3"
    ],
    "naturaleza_delito": "malos tratos habituales en el ámbito familiar, lesiones en el ámbito familiar, lesiones",
    "demarcacion": "Granollers",
    "reincidencia": "no",
    "pena": [
      {
        "nombre": "María Inés",
        "delitos": [
          {
            "delito": "malos tratos habituales en el ámbito familiar",
            "prision": {
              "años": 0,
              "meses": 3
            },
            "multa": "<null>",
            "perdida_beneficios_publicos": {
              "años": 0,
              "meses": 3
            }
          },
          {
            "delito": "lesiones en el ámbito familiar",
            "prision": {
              "años": 0,
              "meses": 4
            },
            "multa": "<null>",
            "perdida_beneficios_publicos": {
              "años": 0,
              "meses": 4
            }
          },
          {
            "delito": "lesiones",
            "prision": {
              "años": 0,
              "meses": 6
            },
            "multa": "<null>",
            "perdida_beneficios_publicos": {
              "años": 0,
              "meses": 6
            }
          }
        ],
        "responsabilidad_civil": "<null>",
        "pagos_ordenados": "<null>"
      }
    ],
    "recurso": "no",
    "tipo_sentencia": "condenatoria",
    "costos_procesales": "parte demandada"
  }

}
