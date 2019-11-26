import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng4-social-login';
import { GetUsersService } from './core/services/get-users.service';
import { AuthenticationService } from './core/services/authentication.service';
import { GetDataFromApiService } from './core/services/get-data-from-api.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
// import { ViewAllDataComponent } from './view-all-data/view-all-data.component';
import { ChartsModule } from 'ng2-charts';
// import { BarChartComponent } from './view-all-data/bar-chart/bar-chart.component';
import { HeaderComponent } from './modules/home/layout/header/header.component';
import { FooterComponent } from './modules/home/layout/footer/footer.component';
import { LoginComponent } from './modules/home/pages/user-authentication/login/login.component';
import { DataVisualizationComponent } from './modules/home/pages/dashboard/data-visualization/data-visualization.component';
import { BarChartCheckboxComponent } from './modules/home/pages/dashboard/data-visualization/bar-chart-checkbox/bar-chart-checkbox.component';
const appRoutes: Routes = [
  // { path: 'createUser', component: CreateUserComponent },
  //  { path: 'viewAll', component: ViewAllDataComponent, canActivate: [AuthGuard] },
   { path: 'dataVizualization', component: DataVisualizationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('375993200929-i3sctchaoiregk8orntden8f85rh04ls.apps.googleusercontent.com')
  }
], false);

export function provideConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    // CreateUserComponent,
    // ViewAllDataComponent,
    // BarChartComponent,
    DataVisualizationComponent,
    BarChartCheckboxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ChartsModule

  ],
  providers: [GetUsersService, AuthenticationService, AuthGuard, GetDataFromApiService,  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
