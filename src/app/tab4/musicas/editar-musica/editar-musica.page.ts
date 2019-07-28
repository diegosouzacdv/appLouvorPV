import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/model/Musica';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-musica',
  templateUrl: './editar-musica.page.html',
  styleUrls: ['./editar-musica.page.scss'],
})
export class EditarMusicaPage implements OnInit {

  public id = '';
  public musica: Musica;
  public loading: any;

  constructor(
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private musicaService: MusicaService
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // tslint:disable-next-line: radix
    this.musicaId(parseInt(this.id));
  }

  public async musicaId(id: number) {
    await this.presentLoading();
    try {
      await this.musicaService.musicasId(id)
        .subscribe((response: Musica) => {
          this.musica = response;
          console.log(this.musica);
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
      // tslint:disable-next-line: radix
      this.musicaId(parseInt(this.id));
      event.target.complete();
    }, 2000);
  }

}
