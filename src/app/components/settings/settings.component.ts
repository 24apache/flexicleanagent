import { Component } from "@angular/core";

declare var window: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  formModal: any;

  ngOnInit(): void{
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById("exampleModal")
    // )
  }

  openModal(){
    this.formModal.show();
  }

  doSomething(){
    this.formModal.hide();
  }
}
