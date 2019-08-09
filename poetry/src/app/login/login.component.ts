import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  vars : Object = {
    nzTitle : "烦请阁下键入名号",
    passwordVisible : false,
    password:""
  };

  constructor(private router : Router) {}


  ngOnInit() {
  }

  login () :void {
    this.router.navigateByUrl("index")
  }


}
