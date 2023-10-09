import { Component } from '@angular/core';



declare var window: any;
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent {

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




    //MODAL
  
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


  
}
