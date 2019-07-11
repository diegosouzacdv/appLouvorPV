import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule],


providers: [
    StatusBar,
    Keyboard,
    StorageService,
    AuthService,
    UsuarioService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
