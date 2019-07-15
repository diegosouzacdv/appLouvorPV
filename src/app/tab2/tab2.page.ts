import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from '../services/musica.service';
import { MusicasAllDto } from './../model/MusicasAll.dto';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  public loading: any
  public musicas: MusicasAllDto

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService
  ) { }

  ngOnInit() {
    this.todasMusicas();
  }

  public async todasMusicas(){
    await this.presentLoading();
    try {
      await this.musicaService.todasMusicas()
        .subscribe((response: MusicasAllDto) => {
          this.musicas = response;
          console.log(response);
        },
        error => {
        })
    }finally {
        this.loading.dismiss();
      }
  }

  
  public mostrarMusica(id: number) {
    console.log("chamando pagina individual de música")
    this.musicaService.musicasPorId(id)
    .subscribe((response: MusicasAllDto) => {
      console.log(response);
    },
    error => {
    })
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
