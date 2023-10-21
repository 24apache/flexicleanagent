import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

@Component({
	selector: 'app-company-signup',
	templateUrl: './company-signup.component.html',
	styleUrls: ['./company-signup.component.scss'],
})
export class CompanySignupComponent implements OnInit {
	currentUser!: UserType;
	exform!: FormGroup;
	isLoading = false;
	isSuccess = false;
	resMessage?: string;
	countries!: Country[];
	cities!: City[];
	areas!: Area[];

	  public selectedValue: string = "";
	  public searchValue: string = "";
	  public filteredList!: Country[];

	constructor(private fb: FormBuilder, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

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

	filterDropdown(event: any) {
		const searchString = event.target['value'].toLowerCase();
		window.scrollTo(window.scrollX, window.scrollY + 1);
		if (!searchString) {
		  this.filteredList = this.countries.slice();
		  return;
		} else {
		  this.filteredList = this.countries.filter((country: { title: string; }) => country.title.toLowerCase().indexOf(searchString) > -1 );
		}
		window.scrollTo(window.scrollX, window.scrollY - 1);
	  }

	  selectValue(name: string) {
		this.selectedValue = name;
	  }

	registerCompany() {
		console.log(this.exform.value);
		if (this.exform.valid) {
			this.isLoading = true;
			const record = this.exform.value;

			if(this.currentUser?.id){
				this.userServ.update(record, this.currentUser?.id).subscribe(
					(response: apiResponse) => {
						console.log(response);
						this.isLoading = false;
						this.isSuccess = true;
						this.router.navigateByUrl('preview-detail');
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
			}else{
				this.resMessage = "Invalid process";
			}
		} else {
			Object.values(this.exform.controls).forEach((control) => control.markAsTouched());
		}
	}

	getUserInfo() {
		this.userServ.getUserByToken().subscribe(
			(response) => {
				this.currentUser = response;
				this.exform.get("companyName")?.setValue(this.currentUser?.companyName);
				this.exform.get("ownerName")?.setValue(this.currentUser?.ownerName);
				this.exform.get("country")?.setValue(this.currentUser?.country);
				if(this.currentUser?.country){
					this.getCities();
				}
				this.exform.get("city")?.setValue(this.currentUser?.city);
				if(this.currentUser?.city){
					this.getAreas();
				}
				this.exform.get("area")?.setValue(this.currentUser?.area);
				this.exform.get("zipcode")?.setValue(this.currentUser?.zipcode);
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
				this.filteredList = response.data;
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

	getCities() {
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

	getAreas() {
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

	back() {
		this.router.navigate(['/signup']);
	}
}
