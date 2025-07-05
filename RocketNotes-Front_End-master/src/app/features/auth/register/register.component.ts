import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../../core/services/auth.service";
import {NotificationService} from "../../../core/services/notification.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  hidePassword = true;
  hidePasswordConfirm = true;


  constructor(private fb: FormBuilder ,private authService: AuthenticationService,
  private notificationService: NotificationService,
  private titleService: Title,
  private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      
      const userData = {
        fullName: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };

      console.log('Registering user:', userData);
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.notificationService.openSnackBar('Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/auth/login']);
          this.loading = false;
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.notificationService.openSnackBar('Error en el registro: ' + (error.error?.message || 'Error desconocido'));
          this.loading = false;
        }
      });
    }
  }


  cancel() {
    this.router.navigate(['/auth/login']);
  }
}
