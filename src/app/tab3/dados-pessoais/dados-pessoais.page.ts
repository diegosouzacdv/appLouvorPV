import { Component, OnInit, Input } from '@angular/core';
import { UsuarioDto } from 'src/app/model/usuario.dto';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage implements OnInit {
  
  public usuario: UsuarioDto = {
    pessoa: {
      nome: '',
      telefone: ''
  },
  email: '',
  imageUrl: '',
  }

  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public navCtrl: NavController,
    public authService: AuthService,
    ) { 
    
  }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
        },
        error => {});
    }
    else {
      this.authService.logout()
    }
  }

  public editarUsuario(){
    console.log(this.usuario)
  }

}
