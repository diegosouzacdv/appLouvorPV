import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/model/user';
import { API_CONFIG } from '../../config/api.config';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.page.html',
  styleUrls: ['./all-user.page.scss'],
})
export class AllUserPage implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public alertController: AlertController
  ) { }

  public usuarios: User;

  public perfil: number;

  ngOnInit() {
    this.getAllUser();
  }

  public getAllUser() {
    const url = `${API_CONFIG.bucketBaseUrl}/cp1.jpg`;
    this.usuarioService.getAllUser()
        .subscribe((response: User) => {
          this.usuarios = response;
          console.log(this.usuarios);
        },
        error => {});
  }

  async mudarPermissoes(value, usuario) {
    const perfil = value.detail.value;
    console.log(perfil)
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Confirmar <strong>Alteração de Permissões?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            // tslint:disable-next-line: radix
            this.usuarioService.atualizarPermissaoUsuario(parseInt(perfil), usuario.id)
              .subscribe((response) => {
                console.log(response);
              },
              error => {});
          }
        }
      ]
    });

    await alert.present();
  }

  /*public mudarPermissoes(usuario, value) {
    console.log(value.detail.value)
    console.log(usuario.id)
  }*/

}
