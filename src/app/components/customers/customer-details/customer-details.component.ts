import { Component } from "@angular/core";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {

  activePage: number = 1;

  activePages: number = 1;

  nextPage() {
    if (this.activePage < 7) {
      this.activePage++;
    }
  }

  previousPage() {
    if (this.activePage > 1) {
      this.activePage--;
    }
  }

  nextPages() {
    if (this.activePages < 7) {
      this.activePages++;
    }
  }

  previousPages() {
    if (this.activePages > 1) {
      this.activePages--;
    }
  }

}
