import { Injectable } from '@angular/core';

import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { ListPatientsI } from '../../models/listpatients.interface';
import { PatientI } from '../../models/patient.interface';

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

   getOnePatient(idPatient:number):Observable<PatientI>{
    let direction = this.url + "patients/patient?id=" + idPatient;

    return this.http.get<PatientI>(direction);
   }

   updatePatient(patient:PatientI) {
    let direction = this.url + "update-patient";
    return this.http.put<PatientI>(direction, patient);
   }

   deletePatient(patient:PatientI) {
    let direction = this.url + "delete-patient/" + patient.idPatient;
    // let Options = {
    //   headers: new HttpHeaders({
    //     'content-type': 'application/json'
    //   }),
    //   body: patient
    // }
    return this.http.delete<ResponseI>(direction)

   }

   addPatient(patient:PatientI) {
    let direction = this.url + "patients/add-patient/";
    return this.http.post<PatientI>(direction,patient)
   }
}
