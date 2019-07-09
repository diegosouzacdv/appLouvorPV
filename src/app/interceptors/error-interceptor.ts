
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public message: string

    constructor(private toastController: ToastController){ }
 
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
                        }
 
                        return throwError(error);
                    })) as any;
    }
 
 
handle403(){
        
    }

handle401(){
    this.message = 'Usuario ou senha errada!';
    this.presentToast(this.message);
    }


    async presentToast(message: string) {
        const toast = await this.toastController.create({
          message,
          duration: 5000
        });
        toast.present();
      }
 
}
 
 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};