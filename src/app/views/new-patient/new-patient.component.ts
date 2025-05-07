import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiService } from '../../services/api/api.service';
import { PatientI } from '../../models/patient.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.scss'
})
export class NewPatientComponent {

  addPatientForm = new FormGroup({
    idPatient: new FormControl(0, Validators.required),
    dni: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    postalCode: new FormControl(''),
    telephone: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    email: new FormControl(''),
    token: new FormControl('', Validators.required),
  });

  constructor(private apiService:ApiService, private router: Router){}

  addPatient() {
    const newPatient: PatientI = {
          idPatient: this.addPatientForm.value.idPatient!,
          dni: this.addPatientForm.value.dni!,
          name: this.addPatientForm.value.name!,
          address: this.addPatientForm.value.address!,
          postalCode: this.addPatientForm.value.postalCode!,
          telephone: this.addPatientForm.value.telephone!,
          gender: this.addPatientForm.value.gender!,
          dateOfBirth: this.addPatientForm.value.dateOfBirth!,
          email: this.addPatientForm.value.email!,
        };
    this.apiService.addPatient(newPatient).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'], { queryParams: { param: 'add-patient' } });
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
