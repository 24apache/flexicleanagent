import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { OtpVerifyedComponent } from './auth/otp-verifyed/otp-verifyed.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';




const routes: Routes = [

  { path: '', component: SidebarComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'account', component: AccountComponent },
  // { path: 'orders', component: OrdersComponent },
  // { path: 'customers', component: CustomersComponent },
  // { path: 'wallet', component: WalletComponent },
  // { path: 'reports', component: ReportsComponent },
  // { path: 'settings', component: SettingsComponent },

  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'verifyed', component: OtpVerifyedComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
