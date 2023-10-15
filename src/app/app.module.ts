import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertComponent } from "./alert/alert.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
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
import { ItemPriceComponent } from "./components/account/item-price/item-price.component";
import { LocationComponent } from "./components/account/location/location.component";
import { SubscriptionComponent } from "./components/account/subscription/subscription.component";
import { TimeslotComponent } from "./components/account/timeslot/timeslot.component";
import { UsersComponent } from "./components/account/users/users.component";
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
import { OrdersPaymentComponent } from "./components/orders/orders-list/orders-payment/orders-payment.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { UpdateStatusComponent } from "./components/orders/update-status/update-status.component";
import { RatingComponent } from "./components/reports/rating/rating.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { StatsComponent } from "./components/reports/stats/stats.component";
import { CompanyComponent } from "./components/settings/company/company.component";
import { ItemspriceComponent } from "./components/settings/itemsprice/itemsprice.component";
import { LocationsComponent } from "./components/settings/locations/locations.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SubscriptionsComponent } from "./components/settings/subscriptions/subscriptions.component";
import { TimeslotsComponent } from "./components/settings/timeslots/timeslots.component";
import { AllUsersComponent } from "./components/settings/user/all-users/all-users.component";
import { PermissionDetailsComponent } from "./components/settings/user/permission-details/permission-details.component";
import { UserComponent } from "./components/settings/user/user.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { SubHeaderComponent } from "./components/shared/sub-header/sub-header.component";
import { PayoutComponent } from "./components/wallet/payout/payout.component";
import { TransactionComponent } from "./components/wallet/transaction/transaction.component";
import { WalletComponent } from "./components/wallet/wallet.component";
import { UserService } from "./services/user.service";

function appInitializer(userService: UserService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      userService.getUserByToken().subscribe().add(resolve);
    });
  };
}

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
    ChatComponent,
    PartnerPageComponent,
    SignupComponent,
    PartnerPageComponent,
    PreviewPaymentComponent,
    PreviewDetailComponent,
    CompanySignupComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
	FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [UserService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
