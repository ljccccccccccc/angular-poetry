import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Injectable} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { MyUsageComponent } from './my-usage/my-usage.component';
import { AchievementComponent } from './achievement/achievement.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { TodayComponent } from './today/today.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { RegisterComponent } from './register/register.component';

registerLocaleData(zh);

const appRoutes : Routes = [
  {path:"",component:WelcomeComponent,children:
      [{path:"",component:LoginComponent},
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent}]
  },
  {path:"index",component:IndexComponent,children:
      [{path:"",component:MyUsageComponent},
        {path:"my-usage",component:MyUsageComponent},
        {path:"achievement",component:AchievementComponent},
        {path:"purchase",component:PurchaseComponent},
        {path:"today",component:TodayComponent},
        {path:"interfaces",component:InterfacesComponent}]},
  {path:"**",component:NotFoundComponent}];
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    WelcomeComponent,
    LoginComponent,
    NotFoundComponent,
    MyUsageComponent,
    AchievementComponent,
    PurchaseComponent,
    TodayComponent,
    InterfacesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxEchartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
@Injectable()
export class AppModule {
}
