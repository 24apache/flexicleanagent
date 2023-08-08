import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component'
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CompanyDetailsComponent } from './components/account/company-details/company-details.component';
import { LocationComponent } from './components/account/location/location.component';
import { UsersComponent } from './components/account/users/users.component';
import { SubscriptionComponent } from './components/account/subscription/subscription.component';
import { TimeslotComponent } from './components/account/timeslot/timeslot.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderComponent } from './components/order/order.component';
import { SubHeaderComponent } from './components/shared/sub-header/sub-header.component';
import { ItemPriceComponent } from './components/account/item-price/item-price.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CustomerInvoceComponent } from './components/customers/customer-invoce/customer-invoce.component';
import { RatingComponent } from './components/reports/rating/rating.component';
import { StatsComponent } from './components/reports/stats/stats.component';
import { TransactionComponent } from './components/wallet/transaction/transaction.component';
import { PayoutComponent } from './components/wallet/payout/payout.component';
import { ManageAddressComponent } from './components/customers/manage-address/manage-address.component';
import { EditProfileComponent } from './components/customers/edit-profile/edit-profile.component';
import { TrackstatusComponent } from './components/customers/trackstatus/trackstatus.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { UpdateStatusComponent } from './components/orders/update-status/update-status.component';
import { SummaryComponent } from './components/create-order/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyComponent } from './components/settings/company/company.component';
import { TimeslotsComponent } from './components/settings/timeslots/timeslots.component';
import { LocationsComponent } from './components/settings/locations/locations.component';
import { ItemspriceComponent } from './components/settings/itemsprice/itemsprice.component';
import { UserComponent } from './components/settings/user/user.component';
import { SubscriptionsComponent } from './components/settings/subscriptions/subscriptions.component';
import { CompanyInfoComponent } from './components/account/company-details/company-info/company-info.component';
import { CompanyAddressComponent } from './components/account/company-details/company-address/company-address.component';
import { CompanyServiceComponent } from './components/account/company-details/company-service/company-service.component';
import { CompanyHourComponent } from './components/account/company-details/company-hour/company-hour.component';
import { CompanyAccountComponent } from './components/account/company-details/company-account/company-account.component';
import { OrdersPaymentComponent } from './components/orders/orders-list/orders-payment/orders-payment.component';
import { AllUsersComponent } from './components/settings/user/all-users/all-users.component';
import { PermissionDetailsComponent } from './components/settings/user/permission-details/permission-details.component';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ReportsComponent,
    RatingComponent,
    SettingsComponent,
    WalletComponent,
    CustomersComponent,
    OrdersComponent,
    AccountComponent,
    HomeComponent,
    OtpVerificationComponent,
    ForgotPasswordComponent,
    CompanyDetailsComponent,
    LocationComponent,
    UsersComponent,
    SubscriptionComponent,
    TimeslotComponent,
    CreateOrderComponent,
    OrderComponent,
    SubHeaderComponent,
    ItemPriceComponent,
    CustomerDetailsComponent,
    CustomersListComponent,
    CustomerInvoceComponent,
    StatsComponent,
    TransactionComponent,
    PayoutComponent,
    ManageAddressComponent,
    EditProfileComponent,
    TrackstatusComponent,
    OrderDetailComponent,
    OrdersListComponent,
    UpdateStatusComponent,
    SummaryComponent,
    CompanyComponent,
    TimeslotsComponent,
    LocationsComponent,
    ItemspriceComponent,
    UserComponent,
    SubscriptionsComponent,
    CompanyInfoComponent,
    CompanyAddressComponent,
    CompanyServiceComponent,
    CompanyHourComponent,
    CompanyAccountComponent,
    OrdersPaymentComponent,
    AllUsersComponent,
    PermissionDetailsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
