import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface SendMailDialogData {
  parentEmail: string;
}

@Component({
  selector: 'app-send-mail-dialog',
  templateUrl: './send-mail-dialog.component.html',
})
export class SendMailDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SendMailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SendMailDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      parentEmail: [{ value: data.parentEmail, disabled: true }, [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSend() {
    if (this.form.valid) {
      this.dialogRef.close({
        parentEmail: this.data.parentEmail,
        subject: this.form.get('subject')?.value,
        body: this.form.get('body')?.value
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
