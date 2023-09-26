import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { UserService } from './service/user.service'
import { UserInterceptor } from './interceptors/users.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ UserService, {provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
