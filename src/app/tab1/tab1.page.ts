import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    try {
      await this.authService.refreshToken()
      .subscribe(response => {
        this.authService.sucessfullLogin(response.headers.get('Authorization'));
      },
      error => {
      })
    } finally {

    }
  }

}
