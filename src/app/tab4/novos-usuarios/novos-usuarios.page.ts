import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-novos-usuarios',
  templateUrl: './novos-usuarios.page.html',
  styleUrls: ['./novos-usuarios.page.scss'],
})
export class NovosUsuariosPage implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public storage: StorageService,
    public navCtrl: NavController
  ) { }

  public usuarios: any[] = new Array();

  ngOnInit() {
    this.getNovosUsuarios();
  }

  public getNovosUsuarios() {
    this.usuarioService.getNovosUsuarios()
        .subscribe((response: User[]) => {
          this.usuarios = response;
          if (this.usuarios.length === 0) {
            // tslint:disable-next-line: no-unused-expression
            this.usuarios = null;
          }
        },
        error => {});
  }

  async ativarUsuario(usuario) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Confirmar <strong>Altivação do Usuário?</strong>!!!',
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
            const user = this.storage.getLocalUser();
            let igreja = '';
            this.usuarioService.findByEmail(user.email)
              .subscribe(response => {
                igreja = response.igreja.nome;
                this.usuarioService.ativarUsuario(usuario.id, igreja)
                  .subscribe((res) => {
                    this.usuarios = undefined;
                    this.navCtrl.navigateRoot('/tabs/tab4');
                  },
                  error => {});
              });
          }
        }
      ]
    });

    await alert.present();
  }

  public doRefresh(event) {
    setTimeout(() => {
      this.getNovosUsuarios();
      event.target.complete();
    }, 2000);
  }

}
