import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from 'src/app/services/musica.service';
import { Grupo } from './../../model/grupo';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  public grupos: Grupo[];
  public loading: any;

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService,
  ) { }

  ngOnInit() {
    this.todosGrupos();
  }

  public async todosGrupos() {
    await this.presentLoading();
    try {
      await this.musicaService.getGrupos()
        .subscribe((response: Grupo[]) => {
          this.grupos = response;
          console.log(response);
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
      this.todosGrupos();
      event.target.complete();
    }, 2000);
  }

}
