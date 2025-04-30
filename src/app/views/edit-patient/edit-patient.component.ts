import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api/api.service';

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientI } from '../../models/patient.interface';

@Component({
  selector: 'app-edit-patient',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss',
})
export class EditPatientComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  editPatientForm = new FormGroup({
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

  ngOnInit() {
    let idPatient = this.activatedRoute.snapshot.params['id'];

    this.apiService.getOnePatient(idPatient).subscribe({
      next: (data) => {
        const patient: PatientI = data;
        
        this.editPatientForm.patchValue({
          idPatient: patient.idPatient,
          dni: patient.dni,
          name: patient.name,
          address: patient.address,
          postalCode: patient.postalCode,
          telephone: patient.telephone,
          gender: patient.gender,
          dateOfBirth: patient.dateOfBirth,
          email: patient.email,
          token: localStorage.getItem('token'),
        });

        console.log(this.editPatientForm.value);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
  }
}
