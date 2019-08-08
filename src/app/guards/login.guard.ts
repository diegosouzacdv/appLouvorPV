import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public storage: StorageService,
    private router: Router,
    private authService: AuthService,
    public navCtrl: NavController
   ) {}
  // tslint:disable-next-line: max-line-length
  canActivate(): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      const user = this.storage.getLocalUser();
      if (user) {
        this.authService.getUserporEmail(user.email)
          .subscribe(response => {
            if (response.ativo === false) {
              this.router.navigate(['new']);
            } else {
              this.navCtrl.navigateRoot('/tabs');
            }
          });
        }
      resolve(!user ? true : false);
    });
  }
}
