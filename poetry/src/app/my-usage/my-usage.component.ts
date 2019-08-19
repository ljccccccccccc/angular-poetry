import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'app-my-usage',
  templateUrl: './my-usage.component.html',
  styleUrls: ['./my-usage.component.less']
})
export class MyUsageComponent implements OnInit {

  constructor(private myGlobal : GlobalServiceService) {}

  ngOnInit() {
  }

  getOptions() :Object {
    console.warn(this.myGlobal);
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
