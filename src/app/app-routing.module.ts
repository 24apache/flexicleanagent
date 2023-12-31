import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanySignupComponent } from "./auth/company-signup/company-signup.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { LoginComponent } from "./auth/login/login.component";
import { OtpVerificationComponent } from "./auth/otp-verification/otp-verification.component";
import { PartnerPageComponent } from "./auth/partner-page/partner-page.component";
import { PreviewDetailComponent } from "./auth/preview-detail/preview-detail.component";
import { PreviewPaymentComponent } from "./auth/preview-payment/preview-payment.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AccountComponent } from "./components/account/account.component";
import { CompanyAccountComponent } from "./components/account/company-details/company-account/company-account.component";
import { CompanyAddressComponent } from "./components/account/company-details/company-address/company-address.component";
import { CompanyDetailsComponent } from "./components/account/company-details/company-details.component";
import { CompanyHourComponent } from "./components/account/company-details/company-hour/company-hour.component";
import { CompanyInfoComponent } from "./components/account/company-details/company-info/company-info.component";
import { CompanyServiceComponent } from "./components/account/company-details/company-service/company-service.component";
import { ChatComponent } from "./components/chat/chat.component";
import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { SummaryComponent } from "./components/create-order/summary/summary.component";
import { CustomerDetailsComponent } from "./components/customers/customer-details/customer-details.component";
import { CustomerInvoceComponent } from "./components/customers/customer-invoce/customer-invoce.component";
import { CustomersListComponent } from "./components/customers/customers-list/customers-list.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { EditProfileComponent } from "./components/customers/edit-profile/edit-profile.component";
import { ManageAddressComponent } from "./components/customers/manage-address/manage-address.component";
import { TrackstatusComponent } from "./components/customers/trackstatus/trackstatus.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailComponent } from "./components/orders/order-detail/order-detail.component";
import { OrdersListComponent } from "./components/orders/orders-list/orders-list.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { UpdateStatusComponent } from "./components/orders/update-status/update-status.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { CompanyComponent } from "./components/settings/company/company.component";
import { ItemspriceComponent } from "./components/settings/itemsprice/itemsprice.component";
import { LocationsComponent } from "./components/settings/locations/locations.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SubscriptionsComponent } from "./components/settings/subscriptions/subscriptions.component";
import { TimeslotsComponent } from "./components/settings/timeslots/timeslots.component";
import { AllUsersComponent } from "./components/settings/user/all-users/all-users.component";
import { PermissionDetailsComponent } from "./components/settings/user/permission-details/permission-details.component";
import { UserComponent } from "./components/settings/user/user.component";
import { WalletComponent } from "./components/wallet/wallet.component";
import { AuthGuard } from "./services/auth.guard";
import { AlertComponent } from "./alert/alert.component";

const routes: Routes = [

  { path: '', redirectTo: '/partner', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'alert', component: AlertComponent },
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
      { path: 'chating', component: ChatComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'company', // Change to a unique path for the CompanyComponent
            component: CompanyComponent,
            children: [
              { path: '', component: CompanyInfoComponent },
              { path: 'address', component: CompanyAddressComponent }, // Unique path for CompanyAddressComponent
              { path: 'service', component: CompanyServiceComponent }, // Unique path for CompanyServiceComponent
              { path: 'working-hours', component: CompanyHourComponent }, // Unique path for CompanyHourComponent
              { path: 'account', component: CompanyAccountComponent } // Unique path for CompanyAccountComponent
            ]
          },
          { path: 'item-price', component: ItemspriceComponent },
          { path: 'locations', component: LocationsComponent },
          { path: 'subscription', component: SubscriptionsComponent },
          { path: 'timeslot', component: TimeslotsComponent },
          {
            path: 'users', component: UserComponent,
            children: [
              { path: '', component: AllUsersComponent },
              { path: 'permission', component: PermissionDetailsComponent }
            ]
          }
        ]
      }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'partner', component: PartnerPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-company', component: CompanySignupComponent },
  { path: 'preview-payment', component: PreviewPaymentComponent },
  { path: 'preview-detail', component: PreviewDetailComponent },
  { path: 'invoice', component: CustomerInvoceComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'summary-detail', component: SummaryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
