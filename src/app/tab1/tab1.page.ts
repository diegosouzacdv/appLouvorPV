import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../model/user';
import { LoadingController, NavController } from '@ionic/angular';
import { RepertorioService } from '../services/repertorio.service';
import { Repertorio } from '../model/Repertorio';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  public usuario: User = {
    id:'',
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
  }
  public repertorios: Repertorio = {
    id: 0,
    data: '',
    criador: '',
    totalMusicas: 0,
    equipeDoDia: {
      baterista: '',
      guitarrista: '',
      tecladista: '',
      violonista: '',
      ministro: ['']
  },
    musicasRepertorio: [
      {
      id: 0,
      nome: 'teste',
      dataInserida: '',
      notaOriginal: '',
      notaTocada: '',
      grupo: {
        id: 0,
        nome: '',
      },
      categorias: {
        id: 0,
        nome: '',
      },
      estudo: {
        bpm: 0,
      cifra: '',
      guiaInstrumental: '',
      guiaVocal: '',
      letra: ''
      },
      tutorial: {
        baixo: [''],
        bateria: [''],
        guitarra: [''],
        teclado: [''],
        violao: ['']
      }
      }
    ]
  }
  public loading: any

  constructor(
    private authService: AuthService,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    private loadingController: LoadingController,
    public repertorioService: RepertorioService
    ) { }

  ngOnInit() {
    this.getuser();
    this.todosRepertorios();
  }

  public getuser() {
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

  public async todosRepertorios() {
    await this.presentLoading();
    try {
      await this.repertorioService.todosRepertorio()
        .subscribe((response: Repertorio) => {
          this.repertorios = response;
          console.log(this.repertorios);
        },
        error => {
        })
    }finally {
        this.loading.dismiss();
      }
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }


  async ionViewDidEnter() {
    try {
      await this.authService.refreshToken()
      .subscribe(response => {
        this.authService.sucessfullLogin(response.headers.get('Authorization'));
      },
      error => {
      })
    } finally {

    }
  }


}
