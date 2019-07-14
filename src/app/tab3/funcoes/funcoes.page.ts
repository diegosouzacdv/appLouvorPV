import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/model/user';
import { Funcao } from './../../model/funcao';

@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.page.html',
  styleUrls: ['./funcoes.page.scss'],
})
export class FuncoesPage implements OnInit {
  
  public usuario: User
  public novasFuncoes:Funcao[] = new Array();
  public todasFuncoes: Funcao
  public loading: any

  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public navCtrl: NavController,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getUsuario();
    this.getFuncoes();
  }

  public getUsuario(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response
        },
        error => {});
    }
    else {
      this.authService.logout()
    }
  }

  public getFuncoes() {
    this.usuarioService.todasFuncoes()
      .subscribe(response => {
        this.todasFuncoes = response
      })
  }

  public recebeItem(event: { detail: { checked: any; }; }, funcao: any){
    if(event.detail.checked){
      this.novasFuncoes.push(funcao)   
    } else {
      this.novasFuncoes.pop()
    }
}

  public async editarUsuario(funcoes: any){
    this.usuario.funcao = this.novasFuncoes
    console.log(this.usuario)
    await this.presentLoading();
   try {
      await this.usuarioService.atualizarDadosPessoaisUsuario(this.usuario)
      .subscribe(response => {
        this.showInsertOk();
        this.navCtrl.navigateRoot('/tabs/tab3')
      },
      error => {});
    } finally {
      this.loading.dismiss();
    }
  }



  public showInsertOk() {
    let alert = this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Atualização feita com sucesso',
      backdropDismiss:false,
      buttons: [
          {text: 'Ok'}
      ]
    }).then(alert => alert.present())
    }

    public async presentLoading() {
      this.loading = await this.loadingController.create({
        message: 'Por favor, aguarde...'
      });
      return this.loading.present();
    }

}
