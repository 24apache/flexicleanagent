import { Component } from '@angular/core';
// import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-list',
  // standalone: true,
	// imports: [NgbCollapseModule],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {

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
