import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h4 class="text-3xl font-bold text-center text-gray-800">Login</h4>
        <p class="text-sm text-center text-gray-600">Login if you are a returning customer.</p>

        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <p *ngIf="loginError" class="text-sm text-red-500 text-center mb-4">{{ loginError }}</p>

          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-1">Email Address <span class="text-red-500">*</span></label>
              <input type="email" formControlName="email" placeholder="example@mail.com" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <div *ngIf="loginForm.controls.email.invalid && (loginForm.controls.email.dirty || loginForm.controls.email.touched)" class="text-red-500 text-xs mt-1">
                <div *ngIf="loginForm.controls.email.errors?.['required']">El Email es requerido.</div>
                <div *ngIf="loginForm.controls.email.errors?.['email']">Debe tener un formato válido.</div>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-1">Password <span class="text-red-500">*</span></label>
              <input type="password" formControlName="password" placeholder="type password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <div *ngIf="loginForm.controls.password.invalid && (loginForm.controls.password.dirty || loginForm.controls.password.touched)" class="text-red-500 text-xs mt-1">
                <div *ngIf="loginForm.controls.password.errors?.['required']">El Password es requerido.</div>
                <div *ngIf="loginForm.controls.password.errors?.['minlength']">Debe tener mínimo 8 caracteres.</div>
              </div>
            </div>

            <!-- Remember me & Forgot password -->
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center">
                <input type="checkbox" id="rememberMe" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label for="rememberMe" class="ml-2 text-gray-600">Remember Me</label>
              </div>
              <a href="#" class="text-blue-600 hover:underline">Forgot Password?</a>
            </div>

            <!-- Submit -->
            <button type="submit" class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all">
              Login
            </button>
          </div>
        </form>

        <div class="relative flex justify-center text-xs uppercase my-6">
          <span class="bg-white px-2 text-gray-500">Or login in with</span>
          <div class="absolute inset-x-0 top-1/2 h-px bg-gray-300 -z-10"></div>
        </div>

        <div class="flex space-x-3">
          <button class="w-1/2 flex items-center justify-center px-4 py-2 rounded-md bg-[#3b5998] text-white hover:bg-[#344e86] transition-all">
            <i class="fab fa-facebook-f mr-2"></i> Facebook
          </button>
          <button class="w-1/2 flex items-center justify-center px-4 py-2 rounded-md bg-[#db4437] text-white hover:bg-[#c63426] transition-all">
            <i class="fab fa-google mr-2"></i> Google
          </button>
        </div>

        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="#" class="text-blue-600 hover:underline">Register Now</a>
        </p>
      </div>

      <!-- Custom Modal/Alert -->
      <div *ngIf="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl text-center">
          <p class="text-lg font-semibold mb-4">{{ modalMessage }}</p>
          <button (click)="showModal = false" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">OK</button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class App implements OnInit {
  loginError: string = "";
  loginForm: FormGroup;
  showModal: boolean = false;
  modalMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['jose@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      // Assuming a service call would happen here. For this example, we'll simulate it.
      console.log('Login attempt with:', this.loginForm.value);
      this.loginForm.reset();
      this.showMessage('Login completed!');
      
    } else {
      this.loginForm.markAllAsTouched();
      this.showMessage('Error al ingresar los datos.');
    }
  }

  showMessage(message: string): void {
    this.modalMessage = message;
    this.showModal = true;
  }
}
