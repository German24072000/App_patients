import { Component, OnInit } from '@angular/core';
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

  onLogin() {

    const form: LoginI = {
      user: this.loginForm.value.user ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.apiService.loginByEmail(form).subscribe({
      next: (data) => {
        console.log(data);
        
        let dataResponse: ResponseI = data
        if(dataResponse.status == "ok") {
          localStorage.setItem('token', dataResponse.result.token);
          //redirect to page dashboard
          //it's necessary to pass array into navigate()
          this.router.navigate(['dashboard']);
        }
        console.log("Login correcto:", data);
      },
      error: (err) => {
        console.error("Error en login:", err.error?.response || err.message);
        
      }
    });
  }

}
