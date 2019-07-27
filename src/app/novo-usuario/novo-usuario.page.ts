import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.page.html',
  styleUrls: ['./novo-usuario.page.scss'],
})
export class NovoUsuarioPage implements OnInit {

  constructor(
    private authService: AuthService) { }

  ngOnInit() {
  }
  public logout() {
    // tslint:disable-next-line: no-unused-expression
    this.authService.logout();
  }

}
