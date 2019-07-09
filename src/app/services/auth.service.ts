import { Injectable } from '@angular/core';
import { User } from '../model/user';

import { environment } from 'src/environments/environment';
import { ErrorHandlerServiceService } from '../interceptors/error-handler-service.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private headers
  private URL_API: string = environment.URL_API

  constructor(
  
              private errorHandler: ErrorHandlerServiceService,
              private router: Router,
              public menu: MenuController
              ) {}

  public login(user: User) {
   
  }
  public register(user: User) {
  
  }

  public logout() {
   
  }

   //Salvar Usuario
   public registerApi(usuario: User){
  
}
}
