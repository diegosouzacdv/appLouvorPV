import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { MusicasAllDto } from '../model/MusicasAll.dto';
import { Repertorio } from '../model/Repertorio';


@Injectable({
    providedIn: 'root'
  })
  export class RepertorioService {
    constructor(
        public http: HttpClient,
        public storage: StorageService){}

        public todosRepertorio(): Observable<Repertorio> {
            return this.http.get<Repertorio>(`${API_CONFIG.baseUrl}/repertorios/all`);
        }

        

}