import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RepertorioService } from 'src/app/services/repertorio.service';
import { Repertorio } from 'src/app/model/Repertorio';

@Component({
  selector: 'app-repertorios',
  templateUrl: './repertorios.page.html',
  styleUrls: ['./repertorios.page.scss'],
})
export class RepertoriosPage implements OnInit {

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
    musicasRepertorio: [{
      musica: {
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
    }]
  };
  public loading: any;

  constructor(
    private loadingController: LoadingController,
    public repertorioService: RepertorioService
  ) { }

  ngOnInit() {
    this.todosRepertorios();
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
          });
    } finally {
      this.loading.dismiss();
    }
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  public doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.todosRepertorios();
      event.target.complete();
    }, 2000);
  }

}
