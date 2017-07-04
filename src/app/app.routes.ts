import {LoginComponent} from "./usermanagement/login/login.component";
import {RegisterComponent} from "./usermanagement/register/register.component";
export const appRoutes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'}
];
