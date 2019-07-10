import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from './../model/CredenciaisDTO';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';
import { LocalUser } from './../model/local_user';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private headers
  private URL_API: string = environment.URL_API

  constructor(
              private http: HttpClient,
              private router: Router,
              public menu: MenuController,
              public storage: StorageService
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

  public sucessfullLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok
    };
    this.storage.setLocalUser(user);
  }

  public logout() {
    this.storage.setLocalUser(null);
  }
      public register(user: User) {
      
      }

   //Salvar Usuario
   public registerApi(usuario: User){
  
}
}
