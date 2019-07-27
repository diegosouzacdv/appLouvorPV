import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonSlides, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { User } from '../model/user';
import { AuthService } from './../services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginGuard } from './../guards/login.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;

  slideOpts = {
    initialSlide: 0,
    speed: 500
  };

  @ViewChild(IonSlides) slides: IonSlides
  public wavesPosition: number = 0
  public wavesDifference: number = 800
  public userLogin: CredenciaisDTO = {
    email: '',
    senha: ''
  }
  public userRegister: User = {}
  public loading: any

  constructor(public keyboard: Keyboard,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private usuarioService: UsuarioService,
              private authService: AuthService,
              public navCtrl: NavController,
              public menu: MenuController,
              public formBuilder: FormBuilder,
              public loginGuard: LoginGuard
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['teste', [Validators.required]],
      email: ['teste@gmail.com', [Validators.required]],
      telefone: ['61985769860', [Validators.required]],
      senha: ['teste', [Validators.required], Validators.minLength[6]]
    })
  }

  ngOnInit() {

  }

  public async login() {
    await this.presentLoading();
    try {
      await this.authService.authenticate(this.userLogin)
        .subscribe(response => {
          this.authService.sucessfullLogin(response.headers.get('Authorization'));
          this.loginGuard.canActivate();
          this.loading.dismiss();
        },
          error => {
            this.ErrorLoginCadastro();
          });
    } finally {
      this.loading.dismiss();
    }
    // this.formgrup.controls.estadoId.setValue(this.estados[0].id) -> atribuir o primeiro estado selecionado
    // this.formGroup.value.estadoId -> pega o Id do estado selecionao
  }

  public async novoUsuario() {
    await this.presentLoading()
    try {
      await this.usuarioService.novoUsuario(this.formGroup.value)
        .subscribe(response => {
          this.showInsertOk();
        },
          error => {
            this.ErrorLoginCadastro();
           });
    } finally {
      this.loading.dismiss();
    }
  }

  public showInsertOk() {
    const alert = this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      backdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
  }

  public ErrorLoginCadastro() {
    const alert = this.alertCtrl.create({
    header: 'Erro no Servidor',
    message: 'Por Favor, tente novamente daqui alguns minutos...',
    backdropDismiss: false,
    buttons: [
      { text: 'Ok' }
    ]
  // tslint:disable-next-line: no-shadowed-variable
  }).then(alert => alert.present());
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  public ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
}



