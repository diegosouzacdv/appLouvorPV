import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public storage: StorageService,
    private router: Router,
    private authService: AuthService
   ) {}
  // tslint:disable-next-line: max-line-length
  canActivate(): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      const user = this.storage.getLocalUser();
      if (user) {
        this.router.navigate(['tabs/tab1']);
        this.authService.getUserporEmail(user.email)
          .subscribe(response => {
            if (response.ativo === false) {
              this.router.navigate(['new']);
            } else {
              this.router.navigate(['tabs/tab1']);
            }
          });
        }
      resolve(!user ? true : false);
    });
  }
}
