import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

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
  ngOnInit(): void {
  }

  onLogin() {
    console.log(this.loginForm.value);
    
    
  }

}
