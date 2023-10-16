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
	selector: 'app-company-info',
	templateUrl: './company-info.component.html',
	styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
	currentUser!: UserType;
	exform!: FormGroup;
	isLoading = false;
	isSuccess = false;
	resMessage?: string;

	constructor(private fb: FormBuilder, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

	ngOnInit() {
		this.getUserInfo();
		this.exform = this.fb.group({
			companyName: ['', [Validators.required, Validators.minLength(6)]],
			ownerName: ['', [Validators.required, Validators.minLength(6)]],
			haveTax: ['', [Validators.required]],
			taxationNumber: ['', [Validators.required]]
		});
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
			} else {
				this.resMessage = 'Invalid process';
			}
		} else {
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
