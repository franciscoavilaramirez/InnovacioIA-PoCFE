import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { ApiService } from 'src/app/service/api.service';
import * as responseData from 'src/app/response';
import { PopoverComponent } from 'src/app/componentes/popover/popover.component';
import { DocDialogComponent } from 'src/app/componentes/doc-dialog/doc-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-poc1',
  templateUrl: './poc1.component.html',
  styleUrls: ['./poc1.component.scss']
})
export class Poc1Component implements OnInit {

  message:string = '¿Puedes darme algún ejemplo de base jurídica utilizada en las resoluciones de delitos leves de hurto?'
  selectedOption: any;
  //jsonData: any = responseData.responseData.result.answer;
  referencias: string[] = ['[doc1]', '[doc2]', '[doc3]'];
  //referenciasConTextos: any = []
  responseMessage: any = {};
  referenciasEncontradas: any = []
  referenciasTextos: { [key: string]: string } = {
    // '[doc1]': 'Texto asociado a doc1',
    // '[doc2]': 'holaaaaaaaaaaaa',
    // Añade más referencias y sus textos asociados según necesites
  };
  filepath: { [key: string]: string } = {
    // '[doc1]': 'Texto asociado a doc1',
    // '[doc2]': 'holaaaaaaaaaaaa',
    // Añade más referencias y sus textos asociados según necesites
  };

  constructor(public apiService: ApiService,private router: Router,public dialog: MatDialog,) {
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
    console.log('Valor selectedOption:', selectedValue);

    console.log('Valor selectedValue:', selectedValue);
    if(selectedValue == "poc2"){
      this.router.navigate(['/poc2']);
    }
  }
	processMessage(message: string){
  //Llamada a apiService
   this.apiService.processMessage(this.message).subscribe(response => {
    this.responseMessage = response;
    this.asignarTextosAReferencias();
    console.log('PRUEBA RESPONSE MESSAGE',this.responseMessage);
    this.buscarReferencias();
   });
 }
 asignarTextosAReferencias(): void {
  if (this.responseMessage?.result?.citations) {
    // Comprueba si hay al menos una referencia en el array de citas
    if (this.responseMessage.result.citations.length > 0) {
      // Asigna el texto asociado a la primera referencia a `[doc1]`
      this.referenciasTextos['[doc1]'] = this.responseMessage.result.citations[0].content;
      this.filepath['[doc1]'] = this.responseMessage.result.citations[0].filepath;

      this.referenciasTextos['[doc2]'] = this.responseMessage.result.citations[1].content;
      this.filepath['[doc2]'] = this.responseMessage.result.citations[1].filepath;

      this.referenciasTextos['[doc3]'] = this.responseMessage.result.citations[2].content;
      this.filepath['[doc3]'] = this.responseMessage.result.citations[2].filepath;



    }
    console.log('contenido referencia doc1',this.referenciasTextos)
    // Si hay más referencias, puedes asignarlas de manera similar
    // this.referenciasTextos['[doc2]'] = this.responseMessage.result.citations[1];
    // Y así sucesivamente para más referencias
  }
}
 buscarReferenciasDocumentos(texto: string) {
  const patron = /\[doc\d\]/g;
  const coincidencias = texto.match(patron);
  return coincidencias || [];
}

// buscarReferencias(): void {
//   this.referenciasEncontradas = this.buscarReferenciasDocumentos(this.responseMessage.result.answer);
//   console.log('Referencias encontradas:', this.referenciasEncontradas);

        //1
// }
// buscarReferencias(): void {
//   const texto = this.responseMessage.result.answer;
//   const patron = /\[doc\d\]/g;
//   let lastIndex = 0;
//   let match: RegExpExecArray | null;
//   this.referenciasEncontradas = [];

//   while ((match = patron.exec(texto)) !== null) {
//     const referencia = match[0];
//     const indiceInicio = match.index;
//     const indiceFin = patron.lastIndex;
//     const textoAnterior = texto.substring(lastIndex, indiceInicio);
//     this.referenciasEncontradas.push({ tipo: 'texto', contenido: textoAnterior });
//     this.referenciasEncontradas.push({ tipo: 'referencia', contenido: referencia });
//     lastIndex = indiceFin;
//   }

//   const textoRestante = texto.substring(lastIndex);
//   this.referenciasEncontradas.push({ tipo: 'texto', contenido: textoRestante });

//   console.log('Referencias encontradas:', this.referenciasEncontradas);
// }
buscarReferencias(): void {
  const texto = this.responseMessage.result.answer;
  const patronParrafos = /\n\n+/; // Este es solo un ejemplo de patrón para separar párrafos por saltos de línea
  const parrafos = texto.split(patronParrafos);

  this.referenciasEncontradas = [];

  for (let parrafo of parrafos) {
    const referenciasEnParrafo = this.buscarReferenciasDocumentos(parrafo);
    let segmentosParrafo = [];

    // Divide el párrafo en segmentos de texto y referencias
    let segmentoActual = '';
    for (let i = 0; i < parrafo.length; i++) {
      const char = parrafo.charAt(i);
      if (char === '[' && parrafo.charAt(i + 1) === 'd' && parrafo.charAt(i + 2) === 'o' && parrafo.charAt(i + 3) === 'c') {
        // Encontró una referencia, agrega el segmento de texto actual a los segmentos del párrafo
        if (segmentoActual.trim().length > 0) {
          segmentosParrafo.push({ tipo: 'texto', contenido: segmentoActual });
          segmentoActual = '';
        }
        // Encuentra el índice de cierre de la referencia
        const finReferencia = parrafo.indexOf(']', i + 1);
        const referencia = parrafo.substring(i, finReferencia + 1);
        segmentosParrafo.push({ tipo: 'referencia', contenido: referencia });
        i = finReferencia; // Salta al final de la referencia
      } else {
        // Carácter de texto normal, agrégalo al segmento actual
        segmentoActual += char;
      }
    }

    // Agrega el segmento final del párrafo
    if (segmentoActual.trim().length > 0) {
      segmentosParrafo.push({ tipo: 'texto', contenido: segmentoActual });
    }

    // Agrega los segmentos del párrafo al array de referencias encontradas
    this.referenciasEncontradas.push(segmentosParrafo);
  }

  console.log('Referencias encontradas:', this.referenciasEncontradas);
}



openDocDialog(referencia: string) {
  let textoAsociado = this.referenciasTextos[referencia];
  let filepath = this.filepath[referencia]

console.log('texto asociado',textoAsociado)
  const dialog = this.dialog.open(DocDialogComponent, {
    width: '70vw',
    height: '85vh',
    autoFocus: false,
    data: {
      texto: textoAsociado,
      filepath:filepath

    }
  });
    dialog.afterClosed().subscribe( result => {
  });
}
accionReferencia(referencia: string): void {
  console.log('Se hizo clic en la referencia:', referencia);
  // Aquí puedes agregar la lógica para realizar alguna acción con la referencia
}


}
