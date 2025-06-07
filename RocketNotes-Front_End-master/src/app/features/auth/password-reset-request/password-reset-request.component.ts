import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  form!: FormGroup;
  loading = false;

  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(
      private authService: AuthenticationService,
      private notificationService: NotificationService,
      private titleService: Title,
      private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('RocketNotes - Password Reset Request');

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  resetPassword() {
    if (this.form.valid) {
      this.loading = true;
      // Aquí iría la lógica para realizar el cambio de contraseña en el futuro
      console.log('Form value:', this.form.value);
      this.router.navigate(['/auth/login']);
      this.notificationService.openSnackBar('This is a placeholder for password reset.');
      this.loading = false;
    }
  }

  cancel() {
    this.router.navigate(['/auth/login']);
  }
}
