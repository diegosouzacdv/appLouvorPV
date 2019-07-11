import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../model/usuario.dto';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    constructor(
        public http: HttpClient,
        public storage: StorageService){}

    public findByEmail(email: string): Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    public getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

}