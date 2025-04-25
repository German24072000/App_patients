import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {LoginI} from '../../models/login.interface';
import { ResponseI} from '../../models/response.interface';

import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private apiService:ApiService, private router:Router) {}
  ngOnInit(): void {
  }

  // errorStatus:boolean = false;
  errorStatus = signal(false);
  messageError:any = "";

  onLogin() {

    const form: LoginI = {
      user: this.loginForm.value.user ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.apiService.loginByEmail(form).subscribe({
      next: (data) => {
        
        let dataResponseI: ResponseI = data

        if(dataResponseI.status == "ok") {
          //keep token in localStorage
          localStorage.setItem('token', dataResponseI.result);
          //redirect to page dashboard, it's necessary to pass array into navigate()
          this.router.navigate(['dashboard']);
        }
        console.log("Login correcto:", data);
      },
      error: (err) => {
        // this.errorStatus = true;
        this.errorStatus.set(true);
        this.messageError = err.error.result;
        console.error("Error en login:", err.error || err.message);
      }
    });
  }

}
