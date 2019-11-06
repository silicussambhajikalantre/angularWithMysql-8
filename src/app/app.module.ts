import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng4-social-login';
import { GetUsersService } from './_services/get-users.service';
import { AuthenticationService } from './_services/authentication.service';
import { GetDataFromApiService } from './_services/get-data-from-api.service';
import { AuthGuard } from './_guard/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewAllDataComponent } from './view-all-data/view-all-data.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './view-all-data/bar-chart/bar-chart.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { BarChartCheckboxComponent } from './data-visualization/bar-chart-checkbox/bar-chart-checkbox.component';
const appRoutes: Routes = [
  { path: 'createUser', component: CreateUserComponent },
   { path: 'viewAll', component: ViewAllDataComponent, canActivate: [AuthGuard] },
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
    CreateUserComponent,
    ViewAllDataComponent,
    BarChartComponent,
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
