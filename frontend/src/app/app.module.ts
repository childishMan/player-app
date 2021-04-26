import { DialogModule } from './components/dialogs/Dialog.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/service/auth.service';
import { RedirectAfterLoginGuard } from './guards/RedirectAfterLogin.guard';
import { IsAuthGuard } from './guards/IsAuth.guard';
import { HomeComponent } from './pages/Home/Home.component';
import { InitialComponent } from './pages/Initial/Initial.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderInterceptor } from '../interceptors/interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtModule } from '@auth0/angular-jwt';
import { UserBadgeComponent } from './components/UserBadge/UserBadge.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    HomeComponent,
    UserBadgeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    JwtModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    DialogModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    IsAuthGuard,
    RedirectAfterLoginGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
