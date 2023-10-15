import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";

declare var window: any;

@Component({
	selector: 'app-preview-payment',
	templateUrl: './preview-payment.component.html',
	styleUrls: ['./preview-payment.component.scss'],
})
export class PreviewPaymentComponent implements OnInit {
	successModal: any;
	currentUser!: UserType;
	exform!: FormGroup;
	isLoading = false;
	isSuccess = false;
	resMessage?: string;

	constructor(private fb: FormBuilder, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

	ngOnInit() {
		this.exform = this.fb.group({
			cardType: ['', [Validators.required]],
			cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), this.cardNumberValidator()]],
			cardHolderName: ['', [Validators.required]],
			cardExpiry: ['', [Validators.required]],
			cardCvv: ['', [Validators.required]],
		});
		this.successModal = new window.bootstrap.Modal(document.getElementById('successModal'));
	}

	doPayment() {
		this.openSuccessModal();
	}

	openSuccessModal() {
		this.successModal.show();
	}

	closeSuccessModal() {
		this.successModal.hide();
	}

	cardNumberValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const isNumber = /^\d+$/.test(control.value);
			return isNumber ? null : { invalidCardNumber: { value: control.value } };
		};
	}
}
