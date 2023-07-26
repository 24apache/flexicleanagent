import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';


declare var window: any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  providers: [NgbAccordionConfig],
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {

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



  //COUNTER
  someValue = 6;
  counterValue = 0;
  @Output() counterChange = new EventEmitter<number>();
  
  @Input()
  get counter() {
    return this.counterValue;
  }
	
  set counter(value) {
    this.counterValue = value;
    this.counterChange.emit(this.counterValue);
  }

  decrement() {
    this.counter--;
  }

  increment() {
    this.counter++;
  }

}
