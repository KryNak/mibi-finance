import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {AccountsService} from './services/accounts.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HighchartsChartModule} from "highcharts-angular";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { CompanyChartComponent } from './components/company-chart/company-chart.component';
import { CompanyArticlesComponent } from './components/company-articles/company-articles.component';
import {MatListModule} from "@angular/material/list";
import {TickerService} from "./services/ticker.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RefreshRequestInterceptorService} from "./services/refresh-request-interceptor.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]}
];

const jwtModuleOptions: JwtModuleOptions = {
  config: {
    allowedDomains: ['example.com']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CompanyCardComponent,
    CompanyChartComponent,
    CompanyArticlesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot(jwtModuleOptions),
    MatToolbarModule,
    MatGridListModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshRequestInterceptorService,
      multi: true
    },
    AuthService,
    AuthGuardService,
    AccountsService,
    TickerService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
