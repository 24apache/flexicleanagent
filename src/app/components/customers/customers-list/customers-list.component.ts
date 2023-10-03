import { Component } from "@angular/core";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent {
  activePage: number = 1;

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
}
