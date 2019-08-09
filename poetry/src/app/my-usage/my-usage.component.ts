import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-usage',
  templateUrl: './my-usage.component.html',
  styleUrls: ['./my-usage.component.less']
})
export class MyUsageComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  getOptions() :Object {
    const option : Object = {
      backgroundColor: '#ffffff',

      title: {
        text: '鄙人用量',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#222'
        }
      },

      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'今日用量',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'已用量'},
            {value:310, name:'未用量'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#b36d61',
              shadowBlur: 100,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    return option;
}

}
