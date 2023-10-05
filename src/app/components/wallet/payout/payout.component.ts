import { Component } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent {
  formModal: any;

  ngOnInit(): void{
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )
  }

  openModal(){
    this.formModal.show();
  }

  doSomething(){
    this.formModal.hide();
  }



  //PAGINATION

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
