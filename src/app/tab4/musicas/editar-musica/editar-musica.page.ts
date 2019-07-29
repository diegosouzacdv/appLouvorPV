import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/model/Musica';
import { ActivatedRoute } from '@angular/router';
import { NotasMusicais } from 'src/app/model/NotasMusicais';
import { Grupo } from 'src/app/model/grupo';
import { Categoria } from './../../../model/categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-editar-musica',
  templateUrl: './editar-musica.page.html',
  styleUrls: ['./editar-musica.page.scss'],
})
export class EditarMusicaPage implements OnInit {
  public formGroup: FormGroup;
  public id = '';
  public musica: Musica = {
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
  };
  public notas = NotasMusicais;
  public grupos: Grupo[];
  public categorias: Categoria[];
  public loading: any;
  public tutorialViolao: string[] = this.musica.tutorial.violao;
  public limpaForm: any = {
    violao: '',
    guitarra: '',
    teclado: '',
    baixo: '',
    bateria: ''
  };

  constructor(
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private musicaService: MusicaService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
    public navCtrl: NavController,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [[Validators.required]],
      nome: [[Validators.required]],
      dataInserida: [[Validators.required]],
      notaOriginal: [[Validators.required]],
      notaAtual: [[Validators.required]],
      grupo: [[Validators.required]],
      categoria: [[Validators.required]],
      bpm: [[Validators.required]],
      letra: [[Validators.required]],
      cifra: [[Validators.required]],
      guiaInstrumental: [[Validators.required]],
      guiaVocal: [[Validators.required]]
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // tslint:disable-next-line: radix
    this.musicaId(parseInt(this.id));
    this.getGrupos();
    this.getCategorias();
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

  public novoTutorial(event) {
    const tutorial = event.value;
    // tslint:disable-next-line: triple-equals
    if (tutorial != '' && event.name === 'violao') {
      this.musica.tutorial.violao.push(event.value);
      this.limpaForm.violao = '';
    }
    // tslint:disable-next-line: triple-equals
    if (tutorial != '' && event.name === 'guitarra') {
      this.musica.tutorial.guitarra.push(event.value);
      this.limpaForm.guitarra = '';
    }
    // tslint:disable-next-line: triple-equals
    if (tutorial != '' && event.name === 'teclado') {
      this.musica.tutorial.teclado.push(event.value);
      this.limpaForm.teclado = '';
    }
    // tslint:disable-next-line: triple-equals
    if (tutorial != '' && event.name === 'baixo') {
      this.musica.tutorial.baixo.push(event.value);
      this.limpaForm.baixo = '';
    }
    // tslint:disable-next-line: triple-equals
    if (tutorial != '' && event.name === 'bateria') {
      this.musica.tutorial.bateria.push(event.value);
      this.limpaForm.bateria = '';
    }
  }

  public async zerarTutorial(event) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Isso vai apagar todos os links, <strong>deseja continuar?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            switch (event.name) {
              case 'violao':
              this.musica.tutorial.violao.length = 0;
              break;
              case 'guitarra':
              this.musica.tutorial.guitarra.length = 0;
              break;
              case 'teclado':
              this.musica.tutorial.teclado.length = 0;
              break;
              case 'baixo':
              this.musica.tutorial.baixo.length = 0;
              break;
              case 'bateria':
              this.musica.tutorial.bateria.length = 0;
              break;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  public async updateMusica() {
    await this.presentLoading();
    try {
      console.log(this.musica)
      await this.musicaService.atualizarMusica(this.musica)
        .subscribe(response => {
          this.showInsertOk();
          this.navCtrl.navigateRoot('/tabs/tab4');
        },
          error => {
          });
    } finally {
      this.loading.dismiss();
    }
  }

  public getGrupos() {
    this.musicaService.getGrupos()
      .subscribe(response => {
        this.grupos = response;
      },
        error => {
        });
  }

  public getCategorias() {
    this.musicaService.getCategorias()
      .subscribe(response => {
        this.categorias = response;
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
      // tslint:disable-next-line: radix
      this.musicaId(parseInt(this.id));
      event.target.complete();
    }, 2000);
  }

  navegadorApp(url: string) {
    this.iab.create(`${url}`, `_blank`);
  }

  navegadorSystem(url: string) {
    this.iab.create(`${url}`, `_system`);
  }

  public showInsertOk() {
    const alert = this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Atualização feita com sucesso',
      backdropDismiss: false,
      buttons: [
          {text: 'Ok'}
      ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => {
      return alert.present();
    });
    }

}
