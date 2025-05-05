import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api/api.service';

import {Router} from '@angular/router';

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PatientI } from '../../models/patient.interface';

@Component({
  selector: 'app-edit-patient',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss',
})
export class EditPatientComponent implements OnInit {
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

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

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
  }

  updatePatient() {
    const updatedPatient: PatientI = {
      idPatient: this.editPatientForm.value.idPatient!,
      dni: this.editPatientForm.value.dni!,
      name: this.editPatientForm.value.name!,
      address: this.editPatientForm.value.address!,
      postalCode: this.editPatientForm.value.postalCode!,
      telephone: this.editPatientForm.value.telephone!,
      gender: this.editPatientForm.value.gender!,
      dateOfBirth: this.editPatientForm.value.dateOfBirth!,
      email: this.editPatientForm.value.email!,
    };
    
    this.apiService.updatePatient(updatedPatient).subscribe({
      next:() => {
        
        this.router.navigate(['/dashboard'], { queryParams: { param: 'update-patient' } });
      },
      error:(err) => {
        console.log('Error updating patient',err);
        
      }
    })
  }

  deletePatient() {
    const patientToDelete: PatientI = {
      idPatient: this.editPatientForm.value.idPatient!,
      dni: this.editPatientForm.value.dni!,
      name: this.editPatientForm.value.name!,
      address: this.editPatientForm.value.address!,
      postalCode: this.editPatientForm.value.postalCode!,
      telephone: this.editPatientForm.value.telephone!,
      gender: this.editPatientForm.value.gender!,
      dateOfBirth: this.editPatientForm.value.dateOfBirth!,
      email: this.editPatientForm.value.email!,
    };

    console.log(this.editPatientForm.value.idPatient);
    

    this.apiService.deletePatient(patientToDelete).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/dashboard'], { queryParams: { param: 'delete-patient' } });
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
