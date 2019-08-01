import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MusicaService } from '../services/musica.service';
import { MusicasAllDto } from './../model/MusicasAll.dto';
import { Musica } from '../model/Musica';
import { AuthService } from '../services/auth.service';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  public loading: any;
  public mus: Observable<MusicasAllDto>;
  public musicas: MusicasAllDto;
  public filter: string = '';
  public pesquisa: Subject<string> = new Subject<string>();

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.todasMusicas();
    this.mus = this.pesquisa
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((termo: string) =>  {
        return this.musicaService.todasMusicas(termo)
      }),
      catchError ((erro) => {
        console.log(erro)
        return of<MusicasAllDto>()
       })
      )
      
      this.mus.subscribe((musicas: MusicasAllDto) => {
        console.log(musicas)
        this.musicas = musicas['content'];
      })
    //this.todasMusicas(this.filter);
  }

  public async getPesquisa(nome: string){
    this.pesquisa.next(nome)
  }

  public async todasMusicas(){
    let nome = '';
    await this.presentLoading();
    try {
      await this.musicaService.todasMusicas(nome)
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
