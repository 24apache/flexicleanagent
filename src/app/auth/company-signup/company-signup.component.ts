import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { CommonService } from "src/app/services/common.service";
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
  countries!: Country[];
  cities!: City[];
  areas!: Area[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userServ: UserService,
    private commonServ: CommonService
  ) {}

    ngOnInit() {
        this.getUserInfo();
        this.getCountries();
        this.exform = this.fb.group({
            companyName: ['', [Validators.required, Validators.minLength(6)]],
            ownerName: ['', [Validators.required, Validators.minLength(6)]],
            country: ['', [Validators.required]],
            city: ['', [Validators.required]],
            area: ['', [Validators.required]],
            zipcode: ['', [Validators.required]],
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

    getCities(){
        const countryId = this.exform.get('country')?.value;
        this.commonServ.cities(countryId).subscribe(
            (response: apiResponse) => {
              this.cities = response.data;
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

    getAreas(){
        const cityId = this.exform.get('city')?.value;
        this.commonServ.areas(cityId).subscribe(
            (response: apiResponse) => {
              this.areas = response.data;
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

	  back(){
		    this.router.navigate(["/signup"]);
	  }
}
