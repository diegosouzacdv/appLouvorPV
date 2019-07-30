import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from '../services/musica.service';
import { MusicasAllDto } from './../model/MusicasAll.dto';
import { Musica } from '../model/Musica';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  public loading: any;
  public musicas: MusicasAllDto;

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService,
    private authService: AuthService
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

   public logout() {
    // tslint:disable-next-line: no-unused-expression
    this.authService.logout();
  }

}
