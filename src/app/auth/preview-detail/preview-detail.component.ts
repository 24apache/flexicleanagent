import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { Country, CountryOne, Currency } from "src/app/models/country.model";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

@Component({
  selector: 'app-preview-detail',
  templateUrl: './preview-detail.component.html',
  styleUrls: ['./preview-detail.component.scss']
})
export class PreviewDetailComponent implements OnInit {
	currentUser!: UserType;
	isLoading = false;
	isSuccess = false;
	resMessage?: string;
	currency?: Currency;
	country?: CountryOne;
	city?: City;
	area?: Area;

	constructor(private router: Router, private userServ: UserService, private commonServ: CommonService) {}
	ngOnInit(): void {
		this.getUserInfo();
	}

	getUserInfo() {
		this.userServ.getUserByToken().subscribe(
			(response) => {
				this.currentUser = response;
				let country: string;
				let city: string;
				let area: string;
				if(this.currentUser?.country){
					country = this.currentUser?.country;
					this.getCountry(country);
				}
				if(this.currentUser?.city){
					city = this.currentUser?.city;
					this.getCity(city);

				}
				if(this.currentUser?.area){
					area = this.currentUser?.area;
					this.getArea(area);
				}
			},
			(error) => {
				console.log(error);
				this.resMessage = error.message;
			}
		);
	}

	getCurrency(cityId: string) {
		this.commonServ.currency(cityId).subscribe(
			(response: apiResponse) => {
				this.currency = response.data;
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

	getCountry(countryId: string) {
		this.commonServ.country(countryId).subscribe(
			(response: apiResponse) => {
				this.country = response.data;
				if(this.country?.currency){
					this.getCurrency(this.country?.currency);
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

	getCity(cityId: string) {
		this.commonServ.city(cityId).subscribe(
			(response: apiResponse) => {
				this.city = response.data;
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

	getArea(areaId: string) {
		this.commonServ.area(areaId).subscribe(
			(response: apiResponse) => {
				this.area = response.data;
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
