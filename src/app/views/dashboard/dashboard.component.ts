import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { ApiService } from '../../services/api/api.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ListPatientsI } from '../../models/listpatients.interface';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  patients = signal<ListPatientsI[]>([]);

  showAlertUpdatedPatient = signal(false);
  showAlertDeletedPatient = signal(false);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    //get param for show alert from page edit-Patient
    this.activatedRoute.queryParams.subscribe((params) => {
      
      if(params['param'] =='update-patient') {
        this.showAlertUpdatedPatient.set(true)

        setTimeout(() => {
          this.showAlertUpdatedPatient.set(false)
        }, 3000);

        //remove the param from page edit-patient of url
        setTimeout(() => {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {},
            replaceUrl: true
          })
        }, 500);

      } else if(params['param'] =='delete-patient') {
        this.showAlertDeletedPatient.set(true)

        setTimeout(() => {
          this.showAlertDeletedPatient.set(false)
        }, 3000);

        setTimeout(() => {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {},
            replaceUrl: true
          })
        }, 500);
      }
    });


    this.apiService.getAllPatients(1).subscribe({
      next: (data) => {
        this.patients.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editPatient(patient: ListPatientsI) {
    this.router.navigate(['edit-patient', patient.idPatient]);
  }

  newPatient() {
    this.router.navigate(['new-patient']);
  }
}
