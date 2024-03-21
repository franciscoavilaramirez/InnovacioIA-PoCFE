import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Poc1Component } from 'src/app/pages/poc1/poc1.component';

@Component({
  selector: 'app-doc-dialog',
  templateUrl: './doc-dialog.component.html',
  styleUrls: ['./doc-dialog.component.scss']
})
export class DocDialogComponent implements OnInit {

  textoAsociado?: string;

  constructor(public dialogRef: MatDialogRef<Poc1Component>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
console.log('DATOS QUE VIENEN RESPONSEmESSAGE data.texto', this.data.texto);

    console.log('DATOS QUE VIENEN RESPONSEmESSAGE data', this.data);
    this.textoAsociado = JSON.stringify(this.data.texto);
    //console.log('Texto asociado:', this.textoAsociado);
  }



  closedModal(): void {
    this.dialogRef.close();
  }
}
