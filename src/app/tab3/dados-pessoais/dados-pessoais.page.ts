import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage implements OnInit {

  public usuario: User;
  public loading: any;

  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public navCtrl: NavController,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
    ) {}

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
        },
        error => {});
    } else {
      this.authService.logout()
    }
  }

  public async editarUsuario(){
      await this.presentLoading();
      try {
        await this.usuarioService.atualizarDadosPessoaisUsuario(this.usuario)
        .subscribe(response => {
          this.showInsertOk();
          this.navCtrl.navigateRoot('/tabs/tab3');
        },
        error => {});
      } finally {
        this.loading.dismiss();
      }
    }

    public showInsertOk() {
      const alert = this.alertCtrl.create({
        header: 'Sucesso!',
        message: 'Atualização feita com sucesso',
        backdropDismiss: false,
        buttons: [
            {text: 'Ok'}
        ]
      // tslint:disable-next-line: no-shadowed-variable
      }).then(alert => {
        return alert.present();
      });
      }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
