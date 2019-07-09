
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(){ }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("passou")
        return next.handle(req)
                .pipe(
                    catchError(error => {
                       if( !error.status ){
                            error = JSON.parse(error);
                        }
                        switch(error.status){
                            case 403: this.handle403();
                            break;
                        }
 
                        return throwError(error);
                    })) as any;
    }
 
 
handle403(){
        
    }
 
}
 
 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};