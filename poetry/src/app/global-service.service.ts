import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor() { }

  URL="http://localhost:8081";
  CUSTOMEMAIL:string="";
  CUSTOMAVATAR :string = "";
  CUSTOMNICKNAME : string = "";
  CUSTOMBALANCE : string;
  CUSTOMUSAGE : string;
  CUSTOMUSAGETODAY: string;
  CUSTOMUSAGEYESTERDAY : string;
  CUSTOMUSAGEBEFOREYESTERDAY : string;
  CUSTOMIP : string;
  CUSTOMFIRSTTIME:string;
  CUSTOMCOUNT:string;
  CUSTOMISBLACK :string;
  CUSTOMISONLINE:string;
  JSONHEADER = new HttpHeaders().set(
    "Content-Type","application/json;charset=utf-8"
  );
  COMMONHEADER = new HttpHeaders().set(
    "Content-Type","application/x-www-form-urlencoded"
  );

}
