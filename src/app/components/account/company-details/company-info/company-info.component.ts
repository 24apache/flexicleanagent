import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject, debounceTime } from "rxjs";
import { Area } from "src/app/models/area.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

@Component({
	selector: 'app-company-info',
	templateUrl: './company-info.component.html',
	styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
	currentUser!: UserType;
	exform!: FormGroup;
	isLoading = false;
	isSuccess = false;
	isError = false;
	resMessage?: string;
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
		this.exform = this.fb.group({
			companyName: ['', [Validators.required, Validators.maxLength(30)]],
			ownerName: ['', [Validators.required, Validators.maxLength(20)]],
			haveTax: ['', [Validators.required]],
			taxationNumber: ['', Validators.maxLength(20)]
    	}, { validator: this.customValidation });
	}

	customValidation(group: FormGroup) {
		const haveTaxControl = this.exform.get('haveTax');
		const taxationNumberControl = this.exform.get('taxationNumber');

		if (haveTaxControl && taxationNumberControl) {
		  const haveTax = haveTaxControl.value;

		  if (haveTax && !taxationNumberControl.value) {
			taxationNumberControl.setErrors({ required: true });
		  } else {
			taxationNumberControl.setErrors(null);
		  }
		}

		return null;
	}

	onButtonGroupClick($event: { target: any; srcElement: any }) {
		let clickedElement = $event.target || $event.srcElement;
		debugger;
		if (clickedElement.nodeName === 'BUTTON') {
			let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
			// if a Button already has Class: .active
			if (isCertainButtonAlreadyActive) {
				isCertainButtonAlreadyActive.classList.remove('active');
			}

			clickedElement.className += ' active';
		}
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
				console.log(this.currentUser);
				this.exform.get('companyName')?.setValue(this.currentUser?.companyName);
				this.exform.get('ownerName')?.setValue(this.currentUser?.ownerName);
				this.exform.get('haveTax')?.setValue(this.currentUser?.haveTax);
				this.exform.get('taxationNumber')?.setValue(this.currentUser?.taxationNumber);
			},
			(error) => {
				console.log(error);
				this.resMessage = error.message;
			}
		);
	}
}
