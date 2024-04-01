import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private selectedOptionSubject = new BehaviorSubject<string>('poc1');
  selectedOption$ = this.selectedOptionSubject.asObservable();

  apiUrl = 'https://container-app-gene-poc1.salmonriver-c4d5c0f1.francecentral.azurecontainerapps.io'
  apiUrlPoc2 = 'https://container-app-gene-poc2.salmonriver-c4d5c0f1.francecentral.azurecontainerapps.io'

  constructor(private http:HttpClient) { }


  setSelectedOption(option: string) {
    this.selectedOptionSubject.next(option);
  }
  processMessage(message: string): Observable<string> {
    const request = {
      message:message
    }
    // return this.http.post<string>(this.apiUrl + '/process_message', request,this._options);
    return this.http.post<string>(this.apiUrl + '/process_message', request);

  }
  private _options = {
      headers: new HttpHeaders(
    {
      'Content-Type': 'multipart/form-data','accept':'aplication/json',
      //'Access-Control-Allow-Origin': '*',
     // 'Access-Control-Allow-Headers':'Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With'
    })
  }

  processMessageResolucion(formData: FormData): Observable<any> {
    //const myheaders = new HttpHeaders().append('Content-Type', 'multipart/form-data')


    // return this.http.post<string>(this.apiUrl + '/process_message', request,this._options);
    return this.http.post<any>(this.apiUrlPoc2 + '/process_message', formData);

  }

}
