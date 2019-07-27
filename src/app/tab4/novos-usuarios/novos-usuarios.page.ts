import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-novos-usuarios',
  templateUrl: './novos-usuarios.page.html',
  styleUrls: ['./novos-usuarios.page.scss'],
})
export class NovosUsuariosPage implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public alertController: AlertController
  ) { }

  public usuarios: User;

  ngOnInit() {
    this.getNovosUsuarios();
  }

  public getNovosUsuarios() {
    this.usuarioService.getNovosUsuarios()
        .subscribe((response: User) => {
          this.usuarios = response;
          console.log(this.usuarios);
        },
        error => {});
  }

  public doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
