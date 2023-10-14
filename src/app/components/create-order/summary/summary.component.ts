import { Component } from '@angular/core';



declare var window: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {


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
