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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { RepertorioService } from './services/repertorio.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // tslint:disable-next-line: max-line-length
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],


providers: [
    StatusBar,
    Keyboard,
    StorageService,
    AuthService,
    UsuarioService,
    RepertorioService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    InAppBrowser,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
