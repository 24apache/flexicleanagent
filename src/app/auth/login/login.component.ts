import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  exform!: FormGroup;

  ngOnInit() {

    this.exform = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl (null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')])
    })

  }

}
