import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {LoginI} from '../../models/login.interface'

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

  constructor(private apiService:ApiService) {}
  ngOnInit(): void {
  }

  onLogin() {

    const form: LoginI = {
      user: this.loginForm.value.user ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.apiService.loginByEmail(form).subscribe({
      next: (data) => {
        console.log("Login correcto:", data);
      },
      error: (err) => {
        console.error("Error en login:", err.error?.response || err.message);
      }
    });
  }

}
