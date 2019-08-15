import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'index',
  templateUrl:'./index.component.html',
  styleUrls:['./index.component.less']
})
export class IndexComponent implements OnInit {

  ulname:String="鄙人";
  componentName:String="用量";

  isCollapsed : boolean = false;
  constructor(private http : HttpClient,private myGlobal : GlobalServiceService) {}

  ngOnInit() {
  }

  changeComponentName (newUlName:String,newComponentName:String) {
    this.componentName = newComponentName;
    this.ulname = newUlName;
  }

  outline () : void {
    console.warn(this.myGlobal.CUSTOMEMAIL);
    const headers = this.myGlobal.COMMONHEADER;
     this.http.post(this.myGlobal.URL+"/outline",JSON.stringify({'email':this.myGlobal.CUSTOMEMAIL}),{headers})
       .subscribe(res=>{console.log(res)},
         error => {console.log(error)})
  }
}
