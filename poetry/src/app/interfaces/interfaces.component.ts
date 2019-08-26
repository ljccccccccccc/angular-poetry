import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrls: ['./interfaces.component.less']
})
export class InterfacesComponent implements OnInit {
  public  interfaces :number;
  constructor(private http : HttpClient, private myGlobal : GlobalServiceService) { }

  ngOnInit() {
    this.http.get(this.myGlobal.URL + "/interfaces")
      .subscribe(
        res => {
          let tmp : number = 0;
          if(res['data']['interfaces']){
            tmp = res['data']['interfaces'];
            this.interfaces = tmp;
          }else{
          }
        },
        error => {
          this.interfaces = 0
        },
        ()=>{}
      )
  }

}
