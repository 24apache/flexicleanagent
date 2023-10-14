import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Country } from "src/app/models/country.model";
import { CommonService } from "src/app/services/common.service";
import { UserService } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  exform!: FormGroup;
  isLoading = false;
  isSuccess = false;
  resMessage?: string;
  countries!: Country[];

  constructor(private fb: FormBuilder, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

  ngOnInit() {
    this.getCountries();
    this.exform = this.fb.group(
      {
        mobile: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        cPassword: ['', [Validators.required, Validators.minLength(6)]],
        pos: [false],
        online: [false],
        mLogistic: [{ value: false, disabled: true }]
      },
      {
        validators: this.passwordMatchValidator, // Add password match validation
      }
    );

    this.exform.get('online')?.valueChanges.subscribe((online) => {
      const mLogisticControl = this.exform.get('mLogistic');
      if (mLogisticControl) {
        if (online) {
          mLogisticControl.setValue(true);
          mLogisticControl.enable();
        } else {
          mLogisticControl.setValue(false);
          mLogisticControl.disable();
        }
      }
    });
  }

  // Custom password match validator
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('cPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    console.log(this.exform.value);
    if (this.exform.valid) {
      this.isLoading = true;
      const { ...record} = this.exform.value;

      this.userServ.register(record).subscribe(
        (response: apiResponse) => {
          console.log(response);
          this.isLoading = false;
          this.isSuccess = true;
          this.router.navigateByUrl('signup-company');
        },
        (error: apiResponse) => {
          console.log(error);
          this.isLoading = false;
          this.isSuccess = false;
          this.resMessage = error.message;
          if (error && error.success == false && error.message === 'Validation Errors') {
            this.resMessage = error.errors.invalid;
          }
        }
      );
    } else {
      Object.values(this.exform.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }

  getCountries() {
    this.commonServ.countries().subscribe(
      (response: apiResponse) => {
        this.countries = response.data;
        console.log(this.countries);
      },
      (error: apiResponse) => {
        console.log(error);
        this.resMessage = error.message;
        if (error && error.success == false && error.message === 'Validation Errors') {
          this.resMessage = error.errors.invalid;
        }
      }
    );
  }
}
