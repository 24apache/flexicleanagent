import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent {

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout()
  }

}
