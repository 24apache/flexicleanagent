import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';




const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: '', component: HomeComponent },
        { path: 'account', component: AccountComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'customers', component: CustomersComponent },
        { path: 'wallet', component: WalletComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'settings', component: SettingsComponent },
      ]
    },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'otp-verification', component: OtpVerificationComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
