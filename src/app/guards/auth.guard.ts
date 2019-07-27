import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public storage: StorageService,
    private router: Router
   ) {}
  // tslint:disable-next-line: max-line-length
  canActivate(): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      const user = this.storage.getLocalUser();
      if (!user) {
        this.router.navigate(['login']);
        }
      resolve(user ? true : false);
    });
  }
}
