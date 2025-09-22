import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service'; 
interface LoginRequest {
    email: string;
    password: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Cambia `styleUrl` a `styleUrls`
})
export class LoginComponent implements OnInit {
  
  loginError: string ="";
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['jose@gmail.com', [Validators.required, Validators.email]],
      password: ['123132123', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }
  login() {
    if (this.loginForm.valid) {
      this.LoginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (error) => {
          console.error(error);
          this.loginError=error.message;
        },
        complete: () => {
          console.info('Login completed');
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}
