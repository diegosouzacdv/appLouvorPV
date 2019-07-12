import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from './../model/CredenciaisDTO';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';
import { LocalUser } from './../model/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt'



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
              private http: HttpClient,
              public menu: MenuController,
              public storage: StorageService,
              public navCtrl: NavController
              ) {}

  public authenticate(login: CredenciaisDTO) {
   return this.http.post(
     `${API_CONFIG.baseUrl}/login`, 
     login,
     {
       observe: 'response',
       responseType: 'text'
     })
  }

  public refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`, 
      {},
      {
        observe: 'response',
        responseType: 'text'
      })
   }

  public sucessfullLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  }

  public logout() {
    this.storage.setLocalUser(null);
    this.navCtrl.navigateRoot('/login');
  }
}
