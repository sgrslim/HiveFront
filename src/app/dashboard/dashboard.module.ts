/**
 * Created by ujste on 2017/6/5 0005.
 */

import {NgModule} from "@angular/core";
import {AddgeneratorComponent} from "../generatormanagement/addgenerator/addgenerator.component";
import {AddcustomerComponent} from "../customermanagement/addcustomer/addcustomer.component";
import {AddorderComponent} from "../ordermanagement/addorder/addorder.component";
import {DashboardComponent} from "./dashboard.component";
import {dashboardRoutes} from "./dashboard.routes";
import {RouterModule} from "@angular/router";
import {RequestlistComponent} from "../codemanagement/requestlist/requestlist.component";

import {FooterComponent} from "./footer/footer.component";

import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {RequeststausComponent} from "../codemanagement/requeststaus/requeststaus.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatepickerModule, PaginationModule} from "ngx-bootstrap";
import {CommonModule} from "@angular/common";

import {GeneratorlistComponent} from "../generatormanagement/generatorlist/generatorlist.component";
import {OrderlistComponent} from "../ordermanagement/orderlist/orderlist.component";
import {CustomerlistComponent} from "../customermanagement/customerlist/customerlist.component";
import {UserlistComponent} from "../usermanagement/userlist/userlist.component";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";
import {Http} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AddrequestComponent} from "../codemanagement/addrequest/addrequest.component";
import {RequesttagcomponentComponent} from "../codemanagement/requesttagcomponent/requesttagcomponent.component";
import {HandlerequestComponent} from "../codemanagement/handlerequest/handlerequest.component";
import {AdduserComponent} from "../usermanagement/adduser/adduser.component";
import {CustomercodelistComponent} from "../customercodemanagement/customercodelist/customercodelist.component";
import {AddcustomercodeComponent} from "../customercodemanagement/addcustomercode/addcustomercode.component";
import {DatatimepickComponent} from "../commoncomponent/datatimepick/datatimepick.component";
import {MyAutocompleteComponent} from "../core/my-autocomplete/my-autocomplete.component";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule ,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    DatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [],
  declarations: [

    DashboardComponent,
    UserlistComponent,
    CustomerlistComponent,
    OrderlistComponent,
    GeneratorlistComponent,
    RequestlistComponent,
    AddorderComponent,
    AddcustomerComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    AddgeneratorComponent,
    RequeststausComponent,
    AddrequestComponent,
    RequesttagcomponentComponent,
    HandlerequestComponent,
    AdduserComponent,
    CustomercodelistComponent,
    AddcustomercodeComponent,
    DatatimepickComponent,
    MyAutocompleteComponent
  ],
  providers: [],
})

export class DashboardModule {
}
