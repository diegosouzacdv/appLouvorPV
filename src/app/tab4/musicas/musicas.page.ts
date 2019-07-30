import { Component, OnInit } from '@angular/core';
import { MusicasAllDto } from 'src/app/model/MusicasAll.dto';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/model/Musica';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.page.html',
  styleUrls: ['./musicas.page.scss'],
})
export class MusicasPage implements OnInit {

  public loading: any;
  public musicas: MusicasAllDto;

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService,
  ) { }

  ngOnInit() {
    this.todasMusicas();
  }

  public async todasMusicas(){
    await this.presentLoading();
    try {
      await this.musicaService.todasMusicas()
        .subscribe((response: MusicasAllDto) => {
          // tslint:disable-next-line: no-string-literal
          this.musicas = response['content'];
          console.log(response);
        },
        error => {
        });
    } finally {
        this.loading.dismiss();
      }
  }
  public mostrarMusica(id: number) {
    this.musicaService.musicasId(id)
    .subscribe((response: Musica) => {
      console.log(response);
    },
    error => {
    });
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
      this.todasMusicas();
      event.target.complete();
    }, 2000);
  }

}
