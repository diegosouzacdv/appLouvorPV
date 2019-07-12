import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { AuthService } from './../services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private toastController: ToastController,
    private authService: AuthService,
    public navCtrl: NavController,
    public menu: MenuController,
    public formBuilder: FormBuilder
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

  public async login(){
   await this.presentLoading();
   try {
    await this.authService.authenticate(this.userLogin)
        .subscribe(response => {
          this.authService.sucessfullLogin(response.headers.get('Authorization'))
          this.navCtrl.navigateRoot('/tabs/tab1')
          this.loading.dismiss();
        },
        error => {
        })
      }finally {

        this.loading.dismiss();
      }
   //this.formgrup.controls.estadoId.setValue(this.estados[0].id) -> atribuir o primeiro estado selecionado
   //this.formGroup.value.estadoId -> pega o Id do estado selecionao
  }

  public async register(){
    await this.presentLoading()
    try {
      await this.authService.register(this.userRegister)   
    } catch (error) {
      if(error.code){
      }else{
      }
    } finally {
      this.loading.dismiss();
    }
  }

 public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  public async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: 'Aguarde!',
      duration: 2000
    });
    toast.present();
  }

  public ionViewWillEnter(){
   this.menu.swipeEnable(false);
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }


  
   
  }



