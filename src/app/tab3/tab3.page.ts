import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UsuarioDto } from './../model/usuario.dto';
import { UsuarioService } from './../services/usuario.service';
import { API_CONFIG } from './../config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  
  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public navCtrl: NavController
    ) { }
    
    public usuario: UsuarioDto

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
          console.log(this.storage.getLocalUser())
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

  public editarDadosPessoais() {
    this.navCtrl.navigateForward('/pessoal')
  }

}
