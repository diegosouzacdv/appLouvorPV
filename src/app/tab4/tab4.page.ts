import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public logout() {
    // tslint:disable-next-line: no-unused-expression
    this.authService.logout();
  }

}
