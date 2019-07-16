import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Repertorio } from 'src/app/model/Repertorio';
import { RepertorioService } from 'src/app/services/repertorio.service';

@Component({
  selector: 'app-repertorio',
  templateUrl: './repertorio.page.html',
  styleUrls: ['./repertorio.page.scss'],
})
export class RepertorioPage implements OnInit {
  
  public id: string;
  public loading: any
  public repertorio: Repertorio = {
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    public repertorioService: RepertorioService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.repertorioId(parseInt(this.id));
  }

  public async repertorioId(id: number) {
    await this.presentLoading();
    try {
      await this.repertorioService.repertorioId(id)
        .subscribe((response: Repertorio) => {
          this.repertorio = response;
          console.log(this.repertorio);
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

}
