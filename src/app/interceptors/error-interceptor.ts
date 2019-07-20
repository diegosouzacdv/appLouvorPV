
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController, AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../services/auth.service';
import { FieldMessage } from './../model/field.message';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public message: string;

    constructor(private toastController: ToastController,
                public authService: AuthService,
                public alertCtrl: AlertController
                ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('passou');
        return next.handle(req)
                .pipe(
                    catchError(error => {
                        let errorObj = error;
                        if (errorObj.error) {
                            errorObj = errorObj.error;
                        }
                        if ( !errorObj.status ) {
                        errorObj = JSON.parse(errorObj);
                        console.log(errorObj);
                        }
                        switch (error.status) {
                            case 403: this.handle403();
                                      break;
                            case 401: this.handle401();
                                      break;
                            case 422: this.handle422(errorObj);
                                      break;
                            case 0: this.handle403();
                            // tslint:disable-next-line: no-switch-case-fall-through
                            default:
                                this.handleDefaultError(errorObj);
                        }

                        return throwError(error);
                    })) as any;
    }

handle403() {
    const alert = this.alertCtrl.create({
        header: 'Ops, Algo de errado!',
        message: 'Por Favor, faça o login novamente!',
        backdropDismiss: false,
        buttons: [
            {text: 'Ok'}
        ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
    this.authService.logout();
    }

 handle401() {
    const alert = this.alertCtrl.create({
        header: 'Erro de Validação',
        message: 'Usuario ou senha errada!',
        backdropDismiss: false,
        buttons: [
            {text: 'Ok'}
        ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
    }

    handle422(errorObj) {
        const alert = this.alertCtrl.create({
            header: 'Falha de autenticação',
            message: this.listErrors(errorObj.error),
            backdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        // tslint:disable-next-line: no-shadowed-variable
        }).then(alert => alert.present());
        }

  handleDefaultError(errorObj) {
    const alert = this.alertCtrl.create({
        header: 'Error ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        backdropDismiss: false,
        buttons: [
            {text: 'Ok'}
        ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
    }

   private listErrors(messages: FieldMessage[]): string {
        let s = '';
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
        }
        return s;
    }

}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
