import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from 'src/app/model/grupo';
import { MusicaService } from 'src/app/services/musica.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editargrupo',
  templateUrl: './editargrupo.page.html',
  styleUrls: ['./editargrupo.page.scss'],
})
export class EditargrupoPage implements OnInit {

  public formGroup: FormGroup;
  public id = '';
  public grupo: Grupo = {
    id: null,
    nome: ''
  };
  public loading: any;
  public limpaForm: any = {
    nome: '',
  };

  constructor(
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private musicaService: MusicaService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [[Validators.required]],
      nome: [[Validators.required]],
    });
   }



  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // tslint:disable-next-line: radix
    this.grupoId(parseInt(this.id));
  }
  public async grupoId(id: number) {
    await this.presentLoading();
    try {
      await this.musicaService.grupoId(id)
        .subscribe((response: Grupo) => {
          this.grupo = response;
          console.log(this.grupo);
        },
          error => {
          });
    } finally {
      this.loading.dismiss();
    }
  }

  public async updateGrupo() {
    await this.presentLoading();
    try {
      console.log(this.grupo)
      await this.musicaService.atualizarGrupo(this.grupo)
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
      this.grupoId(parseInt(this.id));
      event.target.complete();
    }, 2000);
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
