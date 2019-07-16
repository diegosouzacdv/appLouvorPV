import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { MusicasAllDto } from './../model/MusicasAll.dto';
import { Musica } from '../model/MusicaRepertorio';


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

}