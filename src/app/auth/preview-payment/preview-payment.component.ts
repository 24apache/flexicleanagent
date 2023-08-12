import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

declare var window: any;

@Component({
  selector: 'app-preview-payment',
  templateUrl: './preview-payment.component.html',
  providers: [NgbAccordionConfig],
  styleUrls: ['./preview-payment.component.scss']
  
})
export class PreviewPaymentComponent implements OnInit {

  exform!: FormGroup;

  ngOnInit() {

    this.exform = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl (null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')])
    })

  }


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


  
}
