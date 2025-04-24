import { Routes } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {EditPatientComponent} from './views/edit-patient/edit-patient.component';
import {NewPatientComponent} from './views/new-patient/new-patient.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'new-patient',
        component: NewPatientComponent
    },
    {
        path: 'edit-patient',
        component: EditPatientComponent
    },
];
