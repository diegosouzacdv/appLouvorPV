
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToastController, AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../services/auth.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public message: string

    constructor(private toastController: ToastController,
                public authService: AuthService,
                public alertCtrl: AlertController
                ){ }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        console.log("passou")
        return next.handle(req)
                .pipe(
                    catchError(error => {
                        let errorObj = error;
                        if (errorObj.error){
                            errorObj = errorObj.error
                        }
                       if( !errorObj.status ){
                        errorObj = JSON.parse(errorObj);
                        console.log(errorObj)
                        }
                        switch(error.status){
                            case 403: this.handle403();
                            break;
                            case 401: this.handle401();
                            break;
                            default:
                                this.handleDefaultError(errorObj);
                        }
 
                        return throwError(error);
                    })) as any;
    }
 
 
handle403(){
    let alert = this.alertCtrl.create({
        header: 'Ops, Algo de errado!',
        message: 'Por Favor, faça o login novamente!',
        backdropDismiss:false,
        buttons: [
            {text: 'Ok'}
        ]
    }).then(alert => alert.present())
    this.authService.logout()
    }

 handle401(){
    let alert = this.alertCtrl.create({
        header: 'Falha de autenticação',
        message: 'Usuario ou senha errada!',
        backdropDismiss:false,
        buttons: [
            {text: 'Ok'}
        ]
    }).then(alert => alert.present())
    }

  handleDefaultError(errorObj){
    let alert = this.alertCtrl.create({
        header: 'Error ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        backdropDismiss:false,
        buttons: [
            {text: 'Ok'}
        ]
    }).then(alert => alert.present())
    }
 
}
 
 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};