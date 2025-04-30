import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';

import { ListPatientsI } from '../../models/listpatients.interface';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  patients = signal<ListPatientsI[]>([]);

  constructor(private apiService:ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllPatients(1).subscribe({
      next: (data) => {
        this.patients.set(data);
        
      },
      error: (err) => {
        console.log(err);
        
      }
    });
  }

  editPatient(patient:ListPatientsI) {
    this.router.navigate(['edit-patient', patient.idPatient])
  }

  newPatient() {
    this.router.navigate(['new-patient'])
    
  }

}
