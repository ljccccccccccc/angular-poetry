import { Component, OnInit } from '@angular/core';

// import { Component } from '@angular/core';

@Component({
  selector: 'index',
  templateUrl:'./index.component.html',
  styles: [
    `
      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
      }

      .trigger:hover {
        color: #1890ff;
      }

      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      nz-header {
        background: #fff;
        padding: 0;
      }

      nz-content {
        margin: 0 16px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        min-height: 360px;
      }

      nz-footer {
        text-align: center;
      }
    `
  ]
})
// export class NzDemoLayoutCustomTriggerComponent {
//   isCollapsed = false;
// }
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
