import {DashboardComponent} from "./dashboard.component";
import {AddorderComponent} from "../ordermanagement/addorder/addorder.component";
import {AddcustomerComponent} from "../customermanagement/addcustomer/addcustomer.component";
import {UserlistComponent} from "../usermanagement/userlist/userlist.component";
import {CustomerlistComponent} from "../customermanagement/customerlist/customerlist.component";
import {OrderlistComponent} from "../ordermanagement/orderlist/orderlist.component";
import {GeneratorlistComponent} from "../generatormanagement/generatorlist/generatorlist.component";
import {RequestlistComponent} from "../codemanagement/requestlist/requestlist.component";
import {AddgeneratorComponent} from "../generatormanagement/addgenerator/addgenerator.component";
import {AddrequestComponent} from "../codemanagement/addrequest/addrequest.component";
import {HandlerequestComponent} from "../codemanagement/handlerequest/handlerequest.component";
import {AdduserComponent} from "../usermanagement/adduser/adduser.component";
import {AddcustomercodeComponent} from "../customercodemanagement/addcustomercode/addcustomercode.component";
import {CustomercodelistComponent} from "../customercodemanagement/customercodelist/customercodelist.component";
/**
 * Created by ujste on 2017/6/5 0005.
 */
// this.subMenu4UserManagement=[new SubMenu("userlist","userlist")];
// this.subMenu4CustomerManagement=[new SubMenu("customerlist","customerlist")];
// this.subMenu4OrderManagement=[new SubMenu("orderlist","orderlist")];
// this.subMenu4CodeManagement=[new SubMenu("requestlist","requestlist")];
// this.subMenu4Cnfiguration=[new SubMenu("generatorlist","generatorlist")];
export const dashboardRoutes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', rediTo: 'userlist', pathMatch: 'full' },
      { path: 'userlist', component: UserlistComponent },
      { path: 'customerlist', component: CustomerlistComponent },
      { path: 'customercodelist', component: CustomercodelistComponent },
      { path: 'orderlist', component: OrderlistComponent },
      { path: 'requestlist', component: RequestlistComponent },
      { path: 'generatorlist', component: GeneratorlistComponent },
      { path: 'addorder', component: AddorderComponent },
      { path: 'addcustomer', component: AddcustomerComponent },
      { path: 'addGenerator', component: AddgeneratorComponent },
      { path: 'addOrder', component: AddorderComponent },
      { path: 'addcustomercode', component: AddcustomercodeComponent },
      { path: 'adduser', component: AdduserComponent },
      { path: 'addrequest', component: AddrequestComponent },
      { path: 'handlerequest', component: HandlerequestComponent }
    ]
  }
];
