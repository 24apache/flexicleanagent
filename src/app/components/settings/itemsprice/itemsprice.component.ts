import { Component } from '@angular/core';

@Component({
  selector: 'app-itemsprice',
  templateUrl: './itemsprice.component.html',
  styleUrls: ['./itemsprice.component.scss']
})
export class ItemspriceComponent {

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
