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
import { CompanyDetailsComponent } from './components/account/company-details/company-details.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CustomerInvoceComponent } from './components/customers/customer-invoce/customer-invoce.component';
import { ManageAddressComponent } from './components/customers/manage-address/manage-address.component';
import { EditProfileComponent } from './components/customers/edit-profile/edit-profile.component';




const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: '', component: HomeComponent },
        { path: 'account', component: AccountComponent },
        { path: 'create-order', component: CreateOrderComponent },
        { path: 'order', component: OrderComponent },
        { path: 'orders', component: OrdersComponent },
        {
          path: 'customers',
          component: CustomersComponent,
          children: [
            { path: '', component: CustomersListComponent },
            { path: 'details', component: CustomerDetailsComponent },
            { path: 'manage-address', component: ManageAddressComponent },
            { path: 'profile-update', component: EditProfileComponent }
          ]
        },
        { path: 'wallet', component: WalletComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'company-detail', component: CompanyDetailsComponent }
      ]
    },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'otp-verification', component: OtpVerificationComponent},
  { path: 'invoice', component: CustomerInvoceComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
