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


  constructor(private router : Router,private http : HttpClient,private notification: NzNotificationService, private myGlobal : GlobalServiceService) {}


  ngOnInit() {
  }

  login () :void {
    console.log(this.myGlobal.CUSTOMEMAIL,this.password);
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    this.http.post("http://localhost:8081/login", {'customEmail':this.myGlobal.CUSTOMEMAIL,'customPassword':this.password},{headers})
      .subscribe(
        res =>{
          if(res['code'] === 0){
            //把数据保存在本地
            this.myGlobal.CUSTOMEMAIL=res['data']['customEmail'];
            this.myGlobal.CUSTOMAVATAR=res['data']['customAvatar'];
            this.myGlobal.CUSTOMNICKNAME=res['data']['customNickName'];
            this.router.navigateByUrl("index");
          }else if(res['code'] == 2){
            this.createNotificationOnline('error');
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
