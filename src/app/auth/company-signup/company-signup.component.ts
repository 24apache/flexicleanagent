import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.scss'],
})
export class CompanySignupComponent implements OnInit {
  exform!: FormGroup;
  isLoading = false;
  isSuccess = false;
  resMessage?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userServ: UserService
  ) {}

    ngOnInit() {
        this.getUserInfo();
        this.exform = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')]),
        });
    }

    register() {
        console.log(this.exform.value);
        if (this.exform.valid) {
            this.isLoading = true;
            const { ...record } = this.exform.value;

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
                if (
                    error &&
                    error.success == false &&
                    error.message === 'Validation Errors'
                ) {
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

	  getUserInfo(){
        this.userServ.getUserByToken().subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
                this.resMessage = error.message;
            }
        );
    }
}
