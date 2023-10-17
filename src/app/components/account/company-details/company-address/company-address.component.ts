import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject, debounceTime } from "rxjs";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { State } from "src/app/models/state.model";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

@Component({
	selector: 'app-company-address',
	templateUrl: './company-address.component.html',
	styleUrls: ['./company-address.component.scss']
})
export class CompanyAddressComponent implements OnInit {
	currentUser!: UserType;
	exform!: FormGroup;
	isLoading = false;
	isSuccess = false;
	isError = false;
	resMessage?: string;
	countries!: Country[];
	states!: State[];
	cities!: City[];
	areas!: Area[];
	private _success = new Subject<string>();

	// @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

	constructor(private fb: FormBuilder, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

	ngOnInit() {

		this._success.subscribe((message) => (this.resMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});

		this.getUserInfo();
		this.getCountries();
		this.exform = this.fb.group({
			address1: ['', [Validators.required, Validators.maxLength(100)]],
			address2: ['', [Validators.maxLength(100)]],
			country: ['', [Validators.required]],
			state: [''],
			city: ['', [Validators.required]],
			area: ['', [Validators.required]],
			zipcode: ['', [Validators.required, Validators.maxLength(10)]],
		});
	}

	updateCompanyInfo() {
		if (this.exform.valid) {
			this.isLoading = true;
			const record = this.exform.value;

			if (this.currentUser?.id) {
				this.userServ.update(record, this.currentUser?.id).subscribe(
					(response: apiResponse) => {
						console.log(response);
						this.isLoading = false;
						this.isSuccess = true;
						this.isError = false;
						this.resMessage = "Comapny information updated successfully.";
						this._success.next(this.resMessage);
					},
					(error: apiResponse) => {
						console.log(error);
						this.isLoading = false;
						this.isSuccess = false;
						this.isError = true;
						this.resMessage = error.message;
						if (error && error.success == false && error.message === 'Validation Errors') {
							this.resMessage = error.errors.invalid;
						}
						this._success.next(this.resMessage? this.resMessage : "");
					}
				);
			} else {
				this.isError = true;
				this.resMessage = 'Invalid process';
				this._success.next(this.resMessage);
			}
		} else {
			console.log("Errors");
			Object.values(this.exform.controls).forEach((control) => control.markAsTouched());
		}
	}

	getUserInfo() {
		this.userServ.getUserByToken().subscribe(
			(response) => {
				this.currentUser = response;
				this.exform.get("address1")?.setValue(this.currentUser?.address1);
				this.exform.get("address2")?.setValue(this.currentUser?.address2);
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

	getStates() {
		const countryId = this.exform.get('country')?.value;
		this.commonServ.states(countryId).subscribe(
			(response: apiResponse) => {
				this.states = response.data;
				console.log(this.states);
				if(!this.states){
					this.getCities();
				}
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
}
