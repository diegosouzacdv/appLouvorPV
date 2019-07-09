import { Injectable } from '@angular/core';
import { User } from '../model/user';

import { environment } from 'src/environments/environment';
import { ErrorHandlerServiceService } from '../interceptors/error-handler-service.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from './../model/CredenciaisDTO';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private headers
  private URL_API: string = environment.URL_API

  constructor(
              private http: HttpClient,
              private errorHandler: ErrorHandlerServiceService,
              private router: Router,
              public menu: MenuController
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

  public register(user: User) {
  
  }

  public logout() {
   
  }

   //Salvar Usuario
   public registerApi(usuario: User){
  
}
}
