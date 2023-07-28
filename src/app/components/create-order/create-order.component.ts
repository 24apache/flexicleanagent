import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';


declare var window: any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  providers: [NgbAccordionConfig],
  styleUrls: ['./create-order.component.scss'],
  // standalone: true,
	// imports: [NgIf, NgbAlertModule],
})
export class CreateOrderComponent implements OnInit {

  //MODAL
  
  formModal: any;

  ngOnInits(): void{
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


  //ALERT

  private _success = new Subject<string>();

	staticAlertClosed = false;
	successMessage = '';

	@ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

	ngOnInit(): void {
		setTimeout(() => this.staticAlert.close(), 20000);

		this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(50000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
	}

	public changeSuccessMessage() {
		this._success.next(`Amazing ! Added to Basket`);
	}

}
