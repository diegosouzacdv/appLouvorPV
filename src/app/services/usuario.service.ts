import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { UsuarioNewDto } from '../model/usuarioNew.dto';
import { UsuarioDadosPessoaisDto } from '../model/usuarioDadosPessoais.dto';
import { User } from './../model/user';
import { Funcao } from './../model/funcao';

@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    constructor(
        public http: HttpClient,
        public storage: StorageService){}

    public findByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    public todasFuncoes(): Observable<Funcao> {
        return this.http.get<Funcao>(`${API_CONFIG.baseUrl}/funcoes`);
    }

    public getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    public novoUsuario(obj: UsuarioNewDto) {
        return this.http.post(`${API_CONFIG.baseUrl}/usuarios`, obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    public atualizarDadosPessoaisUsuario(obj: User) {
        delete(obj.perfis)
    console.log(obj)
        return this.http.put(`${API_CONFIG.baseUrl}/usuarios/pessoais/${obj.id}`, obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


}