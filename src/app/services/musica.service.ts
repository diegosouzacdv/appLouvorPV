import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { MusicasAllDto } from './../model/MusicasAll.dto';
import { Musica } from '../model/Musica';
import { Grupo } from '../model/grupo';
import { Categoria } from './../model/categoria';
import { Observable } from 'rxjs';
import { MusicaNova } from './../model/MusicaNova';


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

        public grupoId(id: number): Observable<Grupo>  {
            return this.http.get<Grupo>(`${API_CONFIG.baseUrl}/grupos/${id}`);
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

        atualizarGrupo(gru: Grupo) {
            const grupo: Grupo = gru;
            return this.http.put(`${API_CONFIG.baseUrl}/grupos/${gru.id}`, grupo,
                {
                    observe: 'response',
                    responseType: 'text'
                }
            );
          }

        public novaMusica(mus: MusicaNova) {
            return this.http.post(`${API_CONFIG.baseUrl}/musicas`, mus,
                {
                    observe: 'response',
                    responseType: 'text'
                }
            );
        }

}
