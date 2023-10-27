import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject, debounceTime } from "rxjs";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";
import { apiResponse } from "src/app/utils/common.util";

@Component({
	selector: 'app-company-hour',
	templateUrl: './company-hour.component.html',
	styleUrls: ['./company-hour.component.scss']
})
export class CompanyHourComponent implements OnInit {
	currentUser!: UserType;
	exform!: FormGroup;
	isLoading = false;
	isSuccess = false;
	isError = false;
	resMessage?: string;
	private _success = new Subject<string>();

	// @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private router: Router, private userServ: UserService, private commonServ: CommonService) {}

	ngOnInit() {

		this._success.subscribe((message) => (this.resMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
		this.getWorkingHours();
		this.exform = this.fb.group({});
	}

	getWorkingHours() {
		this.isLoading = true;

		this.userServ.getWorkingHours().subscribe(
			(response: apiResponse) => {
				console.log(response.data);
				this.isLoading = false;
				this.isSuccess = true;
				this.isError = false;
				this.resMessage = "Request successfully.";
				this._success.next(this.resMessage);
			},
			(error: apiResponse) => {
				console.log(error);
				this.isLoading = false;
				this.isSuccess = false;
				this.isError = true;
				this.resMessage = error.message;
				this._success.next(this.resMessage? this.resMessage : "");
			}
		);
	}

	updateWorkingHours() {
		this.isLoading = true;
		// const record = this.exform.value;
		const record = {
			"workingHours": [
				{
					day: 'monday',
					status: true,
					times: [
						{ startAt: '9AM', endAt: '1PM' },
						{ startAt: '2PM', endAt: '9PM' }
					]
				},
				{
					day: 'tuesday',
					status: true,
					times: [
						{ startAt: '9AM', endAt: '5PM' }
					]
				},
				{
					day: 'saturday',
					status: true,
					times: [
						{ startAt: '11AM', endAt: '4PM' }
					]
				},
				{
					day: 'sunday',
					status: false,
					times: [
						{ startAt: '9AM', endAt: '7PM' }
					]
				}
			]
		};

		this.userServ.updateWorkingHours(record).subscribe(
			(response: apiResponse) => {
				console.log(response.data);
				this.isLoading = false;
				this.isSuccess = true;
				this.isError = false;
				this.resMessage = "Comapny working hours updated successfully.";
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
	}
}

