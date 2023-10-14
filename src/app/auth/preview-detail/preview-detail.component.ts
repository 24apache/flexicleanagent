import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { UserService, UserType } from "src/app/services/user.service";

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

	constructor(private router: Router, private userServ: UserService, private commonServ: CommonService) {}
	ngOnInit(): void {
		this.getUserInfo();
	}

	getUserInfo() {
		this.userServ.getUserByToken().subscribe(
			(response) => {
				this.currentUser = response;
			},
			(error) => {
				console.log(error);
				this.resMessage = error.message;
			}
		);
	}
}
