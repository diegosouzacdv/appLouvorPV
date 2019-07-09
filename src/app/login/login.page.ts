import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { AuthService } from './../services/auth.service';
import { ErrorHandlerServiceService } from '../interceptors/error-handler-service.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CredenciaisDTO } from '../model/CredenciaisDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    private errorHandler: ErrorHandlerServiceService,
    public navCtrl: NavController,
    public menu: MenuController
    ) { 
    }

  ngOnInit() {
  
  }
  public async login(){
    console.log(this.userLogin)
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin)
      this.navCtrl.navigateRoot('/tabs/tab1')
    } catch (error) {
      console.log(error)
      this.errorHandler.handle(error.code)
    } finally {
      this.loading.dismiss()
    }
  }

  public async register(){
    await this.presentLoading()
    try {
      await this.authService.register(this.userRegister)   
    } catch (error) {
      if(error.code){
        this.errorHandler.handle(error.code)
      }else{
        this.errorHandler.handle(error.status)
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
      message,
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



