import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from "../global-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-my-usage',
  templateUrl: './my-usage.component.html',
  styleUrls: ['./my-usage.component.less']
})
export class MyUsageComponent implements OnInit {

  constructor(private myGlobal : GlobalServiceService,private http : HttpClient, private message: NzMessageService) {}

  ngOnInit() {
    this.http.post(this.myGlobal.URL+'/myusage',{'customEmail':this.myGlobal.CUSTOMEMAIL})
      .subscribe(
        (res)=>{
          if(res['code'] == 0){
            this.myGlobal.CUSTOMUSAGETODAY = res['data']['customUsageToday'];
            this.myGlobal.CUSTOMUSAGEYESTERDAY = res['data']['customUsageYesterday'];
            this.myGlobal.CUSTOMUSAGEBEFOREYESTERDAY = res['data']['customUsageBeforeYesterday'];
          }else{
            this.message.info(res['msg']);
          }
        },
        (error) => {this.message.info("请检查网络情况！");},
        () => {}
      )
  }

  getOptions() :Object {
    const option = {
      xAxis: {
        type: 'category',
        data: ['前天用量', '昨天用量', '今天用量']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [this.myGlobal.CUSTOMUSAGEBEFOREYESTERDAY, this.myGlobal.CUSTOMUSAGEYESTERDAY, this.myGlobal.CUSTOMUSAGETODAY],
        type: 'bar'
      }]
    };
    return option;
  }

}
