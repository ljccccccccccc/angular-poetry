import {Component, Injectable, OnInit} from '@angular/core';
import {NzMessageService, NzNotificationService, UploadFile} from "ng-zorro-antd";
import {Observable, Observer, throwError, interval} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {PoetryCustom} from "../PoetryCustom";
import {GlobalServiceService} from "../global-service.service";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

@Injectable()
export class RegisterComponent implements OnInit {


    passwordVisible :boolean= false;

    canSubmit : boolean = false;

  btnSendCode : string = '发送验证码';
  disabledSendCode : boolean = true;

  loading = false;
  avatarUrl: string;
  poetryCustom : PoetryCustom = {
    customEmail: '',
    customNickName:'',
    customPassword:'',
    customAvatar:this.avatarUrl,
    customVerificationCode:''
  };


  constructor(private msg: NzMessageService,private router : Router,private http:HttpClient, private notification: NzNotificationService,private myGlobal : GlobalServiceService) {}
  ngOnInit(): void {
    this.disabledSendCode  = false;
  }

  backtologin(){
    this.router.navigateByUrl("login");
  }

  registeSubmit() {
    this.checkIsNull(this.poetryCustom.customEmail,'邮箱地址',() => {
      this.checkIsNull(this.poetryCustom.customVerificationCode,'验证码',() => {
        this.checkIsNull(this.poetryCustom.customPassword,'密码', () => {
          this.checkIsNull(this.poetryCustom.customNickName,'名号',() => {this.canSubmit = true});
        });
      });
    });
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    if(this.canSubmit){
      this.http.post(this.myGlobal.URL+"/registe", this.poetryCustom,{headers})
        .subscribe(
          res=>{
            if(res['code'] === 0){
              this.createNotification('success','注册成功，快快登录吧！','恭喜阁下！阁下的注册令陋站深感荣幸，小站如有招待不周，望不吝指教，信息反馈至ljccccccccccc@163.com！');
              this.backtologin();
            }else{
              this.createNotification('error','注册失败！','请检查各表单填写项！小站如有招待不周，望不吝指教，信息反馈至ljccccccccccc@163.com！');
            }},
          error => {
            this.createNotification('error','注册失败！','请检查网络！小站如有招待不周，望不吝指教，信息反馈至ljccccccccccc@163.com！')},
          ()=>{
            this.canSubmit = false;
          });
    }
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  createNotification(type: string,title:string,content:string): void {
    this.notification.create(
      type,
      title,
      content
    );
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    const that = this;
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
        that.poetryCustom.customAvatar = img.src;
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.poetryCustom.customAvatar = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  getCode() {
    this.checkIsNull(this.poetryCustom.customEmail,'邮箱地址',() => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(reg.test(this.poetryCustom.customEmail)){
          this.canSubmit = true;
      }else{
        console.log(this.poetryCustom.customEmail);
        this.canSubmit = false;
        this.createNotification('error','请填写正确的邮箱地址！','邮箱格式一般为:  XXX@XXX.XXX！');
      }
    });
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    if(this.canSubmit){
      this.countPlus();
      this.http.post(this.myGlobal.URL+"/sendVerificationCode", this.poetryCustom,{headers})
        .subscribe(
          res=>{if(res['code'] === 0){
            this.createNotification('success','成功！请注意“垃圾箱”！','验证码发送成功！快去邮箱查看吧！同时注意一下“垃圾箱”哦！');
          }else{
            this.createNotification('error','验证码发送失败！','验证码邮件可能在垃圾箱！请检查是否正确填写。其他信息反馈至ljccccccccccc@163.com！');
          }},
          error => {
            this.createNotification('error','验证码发送失败！','小站如有招待不周，望不吝指教，信息反馈至ljccccccccccc@163.com！');
          },
          ()=>{
            this.canSubmit = false;
          })
    }
  }

  checkIsNull(str : string , notice : string , fn : any = () => {})  {
    if(str == '') {
      this.createNotification('error','请检查'+notice+'！','小站如有招待不周，望不吝指教，信息反馈至ljccccccccccc@163.com！');
      this.canSubmit = false;
    }else{
      fn();
    }
    return this;
  }

  countPlus() {


    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(30));
    takeFourNumbers.subscribe(
      x => {
        this.btnSendCode = (30-x)+"秒后可重发";
        this.disabledSendCode=true;
      },
      error => {},
      () => {
        this.btnSendCode = "发送验证码";
        this.disabledSendCode=false;
      });
  }
}
