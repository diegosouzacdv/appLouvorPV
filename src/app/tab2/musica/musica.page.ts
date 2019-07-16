import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/model/MusicaRepertorio';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
})
export class MusicaPage implements OnInit {

  public id: string;
  public loading: any;
  public musica: Musica = {
    musica: {
      id: 0,
      nome: '',
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
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    public musicaService: MusicaService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.repertorioId(parseInt(this.id));
  }

  public async repertorioId(id: number) {
    console.log(id)
    await this.presentLoading();
    try {
      await this.musicaService.musicasId(id)
        .subscribe((response: Musica) => {
          this.musica = response;
          console.log(this.musica);
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
