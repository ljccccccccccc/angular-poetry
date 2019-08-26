import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.less']
})
export class TodayComponent implements OnInit {

  public  todayUsage :number;
  public  allUsage : number;
  constructor(private http : HttpClient, private myGlobal : GlobalServiceService) { }

  ngOnInit() {
    this.http.get(this.myGlobal.URL + "/todayUsage")
      .subscribe(
        res => {
          if(res['data']['todayUsage']){
            this.todayUsage = res['data']['todayUsage'];
            this.getAllUsage();
          }else{
          }
        },
        error => {
          this.todayUsage = 0
        },
        ()=>{}
      )
  }

  getAllUsage () {
    this.http.get(this.myGlobal.URL + "/allUsage")
      .subscribe(
        res => {
          if(res['data']['allUsage']){
            this.allUsage = res['data']['allUsage']
          }else{

          }
        },
        error => {
          this.allUsage = 0
        },
        ()=>{}
      )
  }

}
