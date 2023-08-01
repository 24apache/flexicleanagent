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
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CustomerInvoceComponent } from './components/customers/customer-invoce/customer-invoce.component';
import { ManageAddressComponent } from './components/customers/manage-address/manage-address.component';
import { EditProfileComponent } from './components/customers/edit-profile/edit-profile.component';
import { TrackstatusComponent } from './components/customers/trackstatus/trackstatus.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { UpdateStatusComponent } from './components/orders/update-status/update-status.component';
import { SummaryComponent } from './components/create-order/summary/summary.component';
import { CompanyComponent } from './components/settings/company/company.component';
import { ItemspriceComponent } from './components/settings/itemsprice/itemsprice.component';
import { LocationsComponent } from './components/settings/locations/locations.component';
import { SubscriptionsComponent } from './components/settings/subscriptions/subscriptions.component';
import { UserComponent } from './components/settings/user/user.component';
import { TimeslotsComponent } from './components/settings/timeslots/timeslots.component';




const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'account',
        component: AccountComponent
      },
      { path: 'create-order', component: CreateOrderComponent },
      { path: 'order', component: OrderComponent },
      {
        path: 'orders', component: OrdersComponent,
        children: [
          { path: '', component: OrdersListComponent },
          { path: 'status-update', component: UpdateStatusComponent },
        ]
      },
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          { path: '', component: CustomersListComponent },
          { path: 'details', component: CustomerDetailsComponent },
          { path: 'manage-address', component: ManageAddressComponent },
          { path: 'profile-update', component: EditProfileComponent },
          { path: 'pickup', component: TrackstatusComponent }
        ]
      },
      { path: 'wallet', component: WalletComponent },
      { path: 'reports', component: ReportsComponent },

      { path: 'settings',
       component: SettingsComponent,
      children: [
        { path: '', component: CompanyComponent  },
        { path: 'item-price', component: ItemspriceComponent },
        { path: 'locations', component: LocationsComponent },
        { path: 'subscription', component: SubscriptionsComponent },
        { path: 'timeslot', component: TimeslotsComponent },
        { path: 'users', component: UserComponent }
      ] },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'invoice', component: CustomerInvoceComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'summary-detail', component: SummaryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
