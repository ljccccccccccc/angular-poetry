import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'index',
  templateUrl:'./index.component.html',
  styleUrls:['./index.component.less']
})
export class IndexComponent implements OnInit {

  isCollapsed : boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
