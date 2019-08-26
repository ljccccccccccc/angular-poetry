import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd";
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    nzTitle = "烦请阁下键入名号";
    passwordVisible =false;
    password="";
    customEmail:string = '';


  constructor(private router : Router,private http : HttpClient,private notification: NzNotificationService, private myGlobal : GlobalServiceService) {}


  ngOnInit() {
  }

  login () :void {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    this.http.post(this.myGlobal.URL+"/login", {'customEmail':this.customEmail,'customPassword':this.password},{headers})
      .subscribe(
        res =>{
          if(res['code'] === 0){
            //把数据保存在session
            sessionStorage.setItem("customEmail",res['data']['customEmail']);
            sessionStorage.setItem("customAvatar",res['data']['customAvatar']);
            sessionStorage.setItem("customNickName",res['data']['customNickName']);
            sessionStorage.setItem("customBalance",res['data']['customBalance']);
            sessionStorage.setItem("customUsage",res['data']['customUsage']);
            sessionStorage.setItem("customUsageToday",res['data']['customUsageToday']);
            sessionStorage.setItem("customUsageYesterday",res['data']['customUsageYesterday']);
            sessionStorage.setItem("customUsageBeforeYesterday",res['data']['customUsageBeforeYesterday']);
            sessionStorage.setItem("customIp",res['data']['customIp']);
            sessionStorage.setItem("customFirstTime",res['data']['customFirstTime']);
            sessionStorage.setItem("customCount",res['data']['customCount']);
            sessionStorage.setItem("customIsBlack",res['data']['customIsBlack']);

            // this.myGlobal.CUSTOMEMAIL= sessionStorage.getItem("customEmail");
            // this.myGlobal.CUSTOMAVATAR  = sessionStorage.getItem("customAvatar");
            // this.myGlobal.CUSTOMNICKNAME  = sessionStorage.getItem("customNickName");
            // this.myGlobal.CUSTOMBALANCE  = sessionStorage.getItem("customBalance");
            // this.myGlobal.CUSTOMUSAGE  = sessionStorage.getItem("customUsage");
            // this.myGlobal.CUSTOMUSAGETODAY = sessionStorage.getItem("customUsageToday");
            // this.myGlobal.CUSTOMUSAGEYESTERDAY = sessionStorage.getItem("customUsageYesterday");
            // this.myGlobal.CUSTOMUSAGEBEFOREYESTERDAY = sessionStorage.getItem("customUsageBeforeYesterday");
            // this.myGlobal.CUSTOMIP = sessionStorage.getItem("customIp");
            // this.myGlobal.CUSTOMFIRSTTIME = sessionStorage.getItem("customFirstTime");
            // this.myGlobal.CUSTOMCOUNT = sessionStorage.getItem("customCount");
            // this.myGlobal.CUSTOMISBLACK  = sessionStorage.getItem("customIsBlack");
            // this.myGlobal.CUSTOMISONLINE = sessionStorage.getItem("customIsOnline");
            this.router.navigateByUrl("index");
          }else if(res['code'] == 2){
            this.createNotificationOnline('error');
          }else if(res['code'] == 1){
            this.createNotification('error');
          }
        },
        error => {console.log(error)},
        ()=>console.log("complete!"));
  }
  register():void {
    this.router.navigateByUrl("register");
  }


  private createNotification(type: string) : void {
    this.notification.create(
      type,
      '登陆失败！',
      '烦请检查邮箱以及密码，如未注册，请先注册！'
    );
  }

  private createNotificationOnline(type: string) : void{
    this.notification.create(
      type,
      '登陆失败！',
      '账号已在线！若不是本人操作，请修改密码！'
    );

  }
}
