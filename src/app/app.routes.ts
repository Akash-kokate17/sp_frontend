import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { OrderComponent } from './user/order/order.component';
import { BookEventComponent } from './user/book-event/book-event.component';
import { RentEventComponent } from './user/rent-event/rent-event.component';
import { ServiceComponent } from './user/service/service.component';
import { SingUpComponent } from './user/sing-up/sing-up.component';
import { LoginComponent } from './user/login/login.component';
import { VerifyOtpComponent } from './user/verify-otp/verify-otp.component';
import { GalleryComponent } from './user/gallery/gallery.component';
import { UserOrderComponent } from './user/user-order/user-order.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminVerifyOtpComponent } from './admin/admin-verify-otp/admin-verify-otp.component';
import { ServicesComponent } from './admin/services/services.component';
import { PendingComponent } from './admin/pending/pending.component';
import { ConfirmedComponent } from './admin/confirmed/confirmed.component';
import { CompletedComponent } from './admin/completed/completed.component';
import { CancelledComponent } from './admin/cancelled/cancelled.component';
import { userLoginedGuard } from './guards/user-logined.guard';
import { orderGuardGuard } from './guards/order-guard.guard';
import { adminVerifiedGuard } from './guards/admin-verified.guard';
import { HelpComponent } from './user/help/help.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'singUp', component: SingUpComponent,canActivate:[userLoginedGuard] },
  { path: 'login', component: LoginComponent ,canActivate:[userLoginedGuard]},
  { path: 'verifyOtp', component: VerifyOtpComponent,canActivate:[userLoginedGuard] },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'help', component: HelpComponent },
      { path: 'order', component: OrderComponent, canActivate:[orderGuardGuard] },
      {
        path: 'order/:type',
        component: OrderComponent,
        canActivate:[orderGuardGuard],
        children: [
          { path: 'bookEvent', component: BookEventComponent },
          { path: 'rentEvent', component: RentEventComponent },
        ],
      },
      { path: 'service', component: ServiceComponent },
      { path: 'myOrder', component: UserOrderComponent },
    ],
  },
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'admin-verifyOtp',component:AdminVerifyOtpComponent,},
  {
    path:'admin',component:AdminLayoutComponent,canActivate:[adminVerifiedGuard],children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'services',component:ServicesComponent},
      {path:'pending',component:PendingComponent},
      {path:'confirmed',component:ConfirmedComponent},
      {path:'completed',component:CompletedComponent},
      {path:'cancelled',component:CancelledComponent},
    ]
  },
  {path:"**",component:NotFoundComponent}
];
