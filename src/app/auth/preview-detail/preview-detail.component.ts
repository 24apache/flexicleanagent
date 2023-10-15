import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, map } from "rxjs";
import { AppCommission, AppSettings } from "src/app/models/app.settings.model";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { Country, CountryOne, Currency } from "src/app/models/country.model";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

@Component({
	selector: 'app-preview-detail',
	templateUrl: './preview-detail.component.html',
	styleUrls: ['./preview-detail.component.scss'],
})
export class PreviewDetailComponent implements OnInit {
	currentUser!: UserType;
	isLoading = false;
	isSuccess = false;
	resMessage?: string;
	appSettings?: AppSettings;
	appCommission?: AppCommission;
	currency?: Currency;
	country?: CountryOne;
	city?: City;
	area?: Area;
	subscriptionCharge?: number = 3.0;

	constructor(private router: Router, private userServ: UserService, private commonServ: CommonService) {}
	ngOnInit(): void {
		// this.getAppSettings();
		// this.getCommissions();
		// this.getUserInfo();
		forkJoin({
			userInfo: this.userServ.getUserByToken(),
			appSettings: this.commonServ.appSettings(),
			commissions: this.commonServ.commissions(),
		})
			.pipe(
				map((responses: any) => {
					this.currentUser = responses.userInfo;
					this.appSettings = responses.appSettings.data;
					this.appCommission = responses.commissions.data;

					if (this.currentUser) {
						this.loadDataForCurrentUser();
					}
				})
			)
			.subscribe();
	}

	private loadDataForCurrentUser() {
		let countryId: string | undefined = this.currentUser?.country;
		let cityId: string | undefined = this.currentUser?.city;
		let areaId: string | undefined = this.currentUser?.area;

		const requests: any[] = [];

		if (countryId) {
			requests.push(this.commonServ.country(countryId));
		}

		if (cityId) {
			requests.push(this.commonServ.city(cityId));
		}

		if (areaId) {
			requests.push(this.commonServ.area(areaId));
		}

		forkJoin(requests).subscribe(
			(responses: any) => {
				if (responses[0]) {
					this.country = responses[0].data;
					if (this.country?.currency) {
						this.getCurrency(this.country.currency);
					}
				}

				if (responses[1]) {
					this.city = responses[1].data;
				}

				if (responses[2]) {
					this.area = responses[2].data;
				}

				this.getTotalSubscriptionCharge();
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

	getUserInfo() {
		this.userServ.getUserByToken().subscribe(
			(response) => {
				this.currentUser = response;
				let country: string;
				let city: string;
				let area: string;
				if (this.currentUser?.country) {
					country = this.currentUser?.country;
					this.getCountry(country);
				}
				if (this.currentUser?.city) {
					city = this.currentUser?.city;
					this.getCity(city);
				}
				if (this.currentUser?.area) {
					area = this.currentUser?.area;
					this.getArea(area);
				}
				this.getTotalSubscriptionCharge();
			},
			(error) => {
				console.log(error);
				this.resMessage = error.message;
			}
		);
	}

	getAppSettings() {
		this.commonServ.appSettings().subscribe(
			(response: apiResponse) => {
				this.appSettings = response.data;
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

	getCommissions() {
		this.commonServ.commissions().subscribe(
			(response: apiResponse) => {
				this.appCommission = response.data;
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
				if (this.country?.currency) {
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

	getTotalSubscriptionCharge() {
		let totalAmount = 0;

		if (this.currentUser?.pos && this.appCommission?.POSSubscriptionCharge) {
			totalAmount += this.appCommission?.POSSubscriptionCharge;
		}

		if (this.currentUser?.online) {
			// Handle online subscription charge if needed
		}
	}
}
