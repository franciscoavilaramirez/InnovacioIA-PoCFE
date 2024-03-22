import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://container-app-gene-poc1.salmonriver-c4d5c0f1.francecentral.azurecontainerapps.io'

  // private _options = {
  //   headers: new HttpHeaders(
  //     {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
  //     })
  // };


  constructor(private http:HttpClient) { }

  //apiUrl = 'http://localhost:4200/api'



  processMessage(message: string): Observable<string> {
    const request = {
      message:message
    }
    // return this.http.post<string>(this.apiUrl + '/process_message', request,this._options);
    return this.http.post<string>(this.apiUrl + '/process_message', request);

  }
  // uploadFile(file: File) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   console.log('hola desde api service')

  //   // Cambia la URL por la URL de tu servidor
  //   return this.http.post<any>('url_para_subir_archivo', formData);
  // }
  // OTRA POSIBLE SOLUCION

  uploadFile(formData:FormData) : Observable<any>{
    return this.http.post<FormData>('url dle backend', formData);
  }

}
