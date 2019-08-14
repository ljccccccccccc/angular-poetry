import {Component, Injectable, OnInit} from '@angular/core';
import {NzMessageService, NzNotificationService, UploadFile} from "ng-zorro-antd";
import {Observable, Observer, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {PoetryCustom} from "../PoetryCustom";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

@Injectable()
export class RegisterComponent implements OnInit {

  vars : Object = {
    nzTitle : "烦请阁下键入名号",
    passwordVisible : false,
    password:""
  };
  loading = false;
  avatarUrl: string;
  postUrl : string = "localhost:8081/registe";
  poetryCustom : PoetryCustom = {
    customEmail: '',
    customPassword:'',
    customNickName:'',
    customAvatar:this.avatarUrl,
    customVerificationCode:''
  };

  public arrayList : any;

  constructor(private msg: NzMessageService,private router : Router,private http:HttpClient, private notification: NzNotificationService) {}
  ngOnInit(): void {
  }

  backtologin(){
    this.router.navigateByUrl("login");
  }

  registeSubmit() {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json;charset=utf-8"
    );
    this.http.post("http://localhost:8081/registe", this.poetryCustom,{headers})
      .subscribe(
        res=>{console.log(res);this.createNotification('success');this.backtologin()},
        error => console.log(error),
          ()=>console.log("complete!"));
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

  createNotification(type: string): void {
    this.notification.create(
      type,
      '注册成功，快快登录吧！',
      '恭喜阁下！阁下的注册令陋站深感荣幸，小站如有招待不周，望不吝指教，信息反馈至ljccccccccccc@163.com！'
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

}
