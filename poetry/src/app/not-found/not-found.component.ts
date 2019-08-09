import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  onClick(): void {
    this.router.navigateByUrl("/index");
  }

}
