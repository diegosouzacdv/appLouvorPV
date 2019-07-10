import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UsuarioDto } from './../model/usuario.dto';
import { UsuarioService } from './../services/usuario.service';
import { API_CONFIG } from './../config/api.config';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  public usuario: UsuarioDto = {
    email:'diegoguitaibanez@gmail.com',
    pessoa: {
      nome: 'Diego de Souza',
      telefone: '(61)98576-9860'
    },
    igreja: {
      nome: 'Águas Claras'
    },
    funcao: [
      {
        id: 2,
        nome:'Violonista'
      },
      {
        id: 3,
        nome:'Guitarrista'
      },
      {
        id: 4,
        nome:'Baixista'
      },
    ]
  }

  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
          console.log(this.usuario)
        },
        error => {});
    }
  }

  public getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
      .subscribe(response => {
        this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      },
      error => {});
  }

}
