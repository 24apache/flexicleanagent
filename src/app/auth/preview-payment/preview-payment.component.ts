import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-preview-payment',
  templateUrl: './preview-payment.component.html',
  styleUrls: ['./preview-payment.component.scss']
  
})
export class PreviewPaymentComponent {

  // exform!: FormGroup;

  // ngOnInit() {

  //   this.exform = new FormGroup({
  //     'email' : new FormControl(null, [Validators.required, Validators.email]),
  //     'password': new FormControl (null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')])
  //   })

  // }
  

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
