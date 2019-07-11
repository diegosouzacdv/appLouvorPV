import { Injectable } from '@angular/core';
import { LocalUser } from './../model/local_user';
import { STORAGE_KEYS } from '../config/store_keys.config';
import { UsuarioDto } from './../model/usuario.dto';
import { UsuarioService } from './usuario.service';

@Injectable({
    providedIn: 'root'
  })
  export class StorageService {

    public usuario: UsuarioDto

    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser ) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
  }  