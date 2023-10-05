import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

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
