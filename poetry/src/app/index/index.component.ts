import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'index',
  templateUrl:'./index.component.html',
  styleUrls:['./index.component.less']
})
export class IndexComponent implements OnInit {
  ulname:String="鄙人";
  componentName:String="用量";

  isCollapsed : boolean = false;
  constructor() {}

  ngOnInit() {
  }

  changeComponentName (newUlName:String,newComponentName:String) {
    this.componentName = newComponentName;
    this.ulname = newUlName;
  }

}
