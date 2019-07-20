import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/model/user';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.page.html',
  styleUrls: ['./all-user.page.scss'],
})
export class AllUserPage implements OnInit {

  public usuarios: User;

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

  public getAllUser() {
    const url = `${API_CONFIG.bucketBaseUrl}/cp1.jpg`;
      this.usuarioService.getAllUser()
        .subscribe((response: User) => {
          this.usuarios = response;
          console.log(this.usuarios)
        },
        error => {});
  }

}
