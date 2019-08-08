import { Component, OnInit } from '@angular/core';
import { MusicasAllDto } from 'src/app/model/MusicasAll.dto';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/model/Musica';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.page.html',
  styleUrls: ['./musicas.page.scss'],
})
export class MusicasPage implements OnInit {

  public loading: any;
  public mus: Observable<MusicasAllDto>;
  public musicas: MusicasAllDto;
  public filter: string = '';
  public pesquisa: Subject<string> = new Subject<string>();

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService,
  ) { }

  ngOnInit() {
    this.todasMusicas();
    this.mus = this.pesquisa
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((termo: string) =>  {
        return this.musicaService.todasMusicas(termo);
      }),
      catchError ((erro) => {
        return of<MusicasAllDto>();
       })
      );
    this.mus.subscribe((musicas: MusicasAllDto) => {
        // tslint:disable-next-line: no-string-literal
        this.musicas = musicas['content'];
      });
  }

  public async getPesquisa(nome: string){
    this.pesquisa.next(nome)
  }

  public async todasMusicas(){
    await this.presentLoading();
    try {
      await this.musicaService.todasMusicas(this.filter)
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
