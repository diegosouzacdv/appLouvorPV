import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from './../services/usuario.service';
import { API_CONFIG } from './../config/api.config';
import { NavController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { User } from './../model/user';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {


  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public authService: AuthService,
    public navCtrl: NavController
    ) { }
    public usuario: User = {
      id: 0,
      email: '',
      ativo: true,
      pessoa: {
        nome: '',
        telefone: '',
    },
    imageUrl: '',
    funcao: [
      {
        id: 0,
        nome:''
      }
    ],
    igreja: {
      id: 0,
      nome: ''
    }
    };

    private timerSubscription: any;
    private userSubscription: any;

  ngOnInit() {
    this.getuser();
  }

  public getuser() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.userSubscription =  this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
        },
        error => {});
    } else {
      this.authService.logout();
    }
  }



  public getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
      .subscribe(response => {
        this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      },
      error => {});
    }

    public ngOnDestroy(): void {
      if (this.userSubscription) {
          this.userSubscription.unsubscribe();
      }
  }

  public doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getuser();
      event.target.complete();
    }, 2000);
  }

  public logout() {
    // tslint:disable-next-line: no-unused-expression
    this.authService.logout();
  }
}
