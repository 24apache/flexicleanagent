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
	selectedCardType: string = 'credit';

	constructor(private fb: FormBuilder, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

	ngOnInit() {
		this.exform = this.fb.group({
			cardType: [this.selectedCardType, [Validators.required]],
			cardNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]+$'), this.cardNumberValidator()]],
			cardHolderName: ['', [Validators.required, Validators.maxLength(50)]],
			cardExpiry: ['', [Validators.required]],
			cardCvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]+$'), this.cardNumberValidator()]],
		});
		this.successModal = new window.bootstrap.Modal(document.getElementById('successModal'));
	}

    onCardTypeChange() {
		// (ngModelChange)="onCardTypeChange()"
        console.log('Selected card type:', this.selectedCardType);
        this.exform.get("cardType")?.setValue(this.selectedCardType);
    }

	doPayment() {
		if (this.exform.valid) {
			this.openSuccessModal();
		}
	}

	openSuccessModal() {
		this.successModal.show();
	}

	closeSuccessModal() {
		this.successModal.hide();
	}

	continueToApp(){
		this.closeSuccessModal();
		this.router.navigateByUrl('dashboard');
	}

	cardNumberValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const isNumber = /^\d+$/.test(control.value);
			return isNumber ? null : { invalidCardNumber: { value: control.value } };
		};
	}
}
