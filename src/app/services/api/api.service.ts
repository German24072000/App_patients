import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { ListPatientsI } from '../../models/listpatients.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:3000/"

  constructor(private http:HttpClient) {

   }

   loginByEmail(form: LoginI):Observable<ResponseI> {
    let direction = this.url + "login";  
    return this.http.post<ResponseI>(direction,form);
   }

   getAllPatients(numberPage:number):Observable<ListPatientsI[]> {

    let direction = this.url + "patients?page=" + numberPage;

    return this.http.get<ListPatientsI[]>(direction)

   }
}
