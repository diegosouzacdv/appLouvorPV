import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { MusicasAllDto } from './../model/MusicasAll.dto';
import { Musica } from '../model/Musica';
import { Grupo } from '../model/grupo';
import { Categoria } from './../model/categoria';


@Injectable({
    providedIn: 'root'
  })
  export class MusicaService {
    constructor(
        public http: HttpClient,
        public storage: StorageService){}

        public todasMusicas(): Observable<MusicasAllDto> {
            return this.http.get<MusicasAllDto>(`${API_CONFIG.baseUrl}/musicas`);
        }

        public musicasId(id: number): Observable<Musica> {
            return this.http.get<Musica>(`${API_CONFIG.baseUrl}/musicas/${id}`);
        }

        public getGrupos(): Observable<Grupo[]> {
            return this.http.get<Grupo[]>(`${API_CONFIG.baseUrl}/grupos`);
        }

        public getCategorias(): Observable<Categoria[]> {
            return this.http.get<Categoria[]>(`${API_CONFIG.baseUrl}/categorias`);
        }

        public atualizarMusica(mus: Musica) {
            const musica: Musica = mus;
            return this.http.put(`${API_CONFIG.baseUrl}/musicas/${mus.id}`, musica,
                {
                    observe: 'response',
                    responseType: 'text'
                }
            );
        }

}
