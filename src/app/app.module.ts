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
import { CreateComponent } from './components/orders/create/create.component';
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
    CreateComponent,
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
    TrackstatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
