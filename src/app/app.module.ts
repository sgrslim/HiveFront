import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {RequestInfoService} from "./services/request-info.service";
import {UserInfoService} from "./services/user-info.service";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './usermanagement/login/login.component';
import { RegisterComponent } from './usermanagement/register/register.component';
import {appRoutes} from "./app.routes";
import { ResetpasswordComponent } from './usermanagement/resetpassword/resetpassword.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";
import {ToastModule} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomerInfoService} from "./services/customer-info.service";
import {GeneratorInfoService} from "./services/generator-info.service";
import {OrderInfoService} from "./services/order-info.service";
import {CustomercodeInfoService} from "./services/customercode-info.service";


export function createTranslateLoader(http: Http ) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [RequestInfoService,UserInfoService,CustomerInfoService,GeneratorInfoService,OrderInfoService,CustomercodeInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
