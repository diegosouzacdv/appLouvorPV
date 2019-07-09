import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerServiceService {

  public loading: any

  constructor(private toastController: ToastController,) { }

  public handle(errorResponse: any){
    let message: string
      switch(errorResponse) {
        case 'auth/email-already-in-use':
          message = 'Este endereço de email já está sendo usado!'
          break;
        case 'auth/invalid-email':
          message = 'Email inválido'
          break;
        case 'auth/weak-password':
          message = 'A senha deve conter pelo menos 6 caracteres!'
          break;
        case 'auth/argument-error':
          message = 'A senha deve conter pelo menos 6 caracteres!'
          break;
        case 'auth/user-not-found':
          message = 'Usuário não encontrado!'
          break;
        case 'auth/wrong-password':
          message = 'Senha errada!'
          break;
        case 0:
          message = 'Contate o administrador!'
          break;
        case 500:
          message = 'Contate o administrador!'
          break;
        case 'nao_encontrado':
          message = 'error cors api'
          break;
        case 'auth/network-request-failed':
          message = 'Conexão com a internet não encontrada!'
          break;

      }
      this.presentToast(message)
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
