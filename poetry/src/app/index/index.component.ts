import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalServiceService} from "../global-service.service";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'index',
  templateUrl:'./index.component.html',
  styleUrls:['./index.component.less']
})
export class IndexComponent implements OnInit {

  ulname:String="鄙人";
  componentName:String="用量";

  isCollapsed : boolean = false;
  constructor(private http : HttpClient,private myGlobal : GlobalServiceService,private router : Router,private notification: NzNotificationService) {}

  ngOnInit() {

    this.myGlobal.CUSTOMEMAIL= sessionStorage.getItem("customEmail");
    this.myGlobal.CUSTOMAVATAR  = sessionStorage.getItem("customAvatar");
    this.myGlobal.CUSTOMNICKNAME  = sessionStorage.getItem("customNickName");
    this.myGlobal.CUSTOMBALANCE  = sessionStorage.getItem("customBalance");
    this.myGlobal.CUSTOMUSAGE  = sessionStorage.getItem("customUsage");
    this.myGlobal.CUSTOMUSAGETODAY = sessionStorage.getItem("customUsageToday");
    this.myGlobal.CUSTOMUSAGEYESTERDAY = sessionStorage.getItem("customUsageYesterday");
    this.myGlobal.CUSTOMUSAGEBEFOREYESTERDAY = sessionStorage.getItem("customUsageBeforeYesterday");
    this.myGlobal.CUSTOMIP = sessionStorage.getItem("customIp");
    this.myGlobal.CUSTOMFIRSTTIME = sessionStorage.getItem("customFirstTime");
    this.myGlobal.CUSTOMCOUNT = sessionStorage.getItem("customCount");
    this.myGlobal.CUSTOMISBLACK  = sessionStorage.getItem("customIsBlack");
    this.myGlobal.CUSTOMISONLINE = sessionStorage.getItem("customIsOnline");
  }

  changeComponentName (newUlName:String,newComponentName:String) {
    this.componentName = newComponentName;
    this.ulname = newUlName;
  }

  outline () : void {
    console.warn(this.myGlobal.CUSTOMEMAIL);
    const headers = this.myGlobal.JSONHEADER;
     this.http.post(this.myGlobal.URL+"/outline",JSON.stringify({'customEmail':this.myGlobal.CUSTOMEMAIL}),{headers})
       .subscribe(res=>{
         if(res['code'] === 0){
           this.router.navigateByUrl("/");
         }else{
           this.createNotification('error');
         }
         },
         error => {console.log(error)})
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      '退出登录失败！',
      '请直接关闭选项卡，重新登录！'
    );
  }
}
