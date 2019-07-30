import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MusicaService } from 'src/app/services/musica.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grupo } from 'src/app/model/grupo';

@Component({
  selector: 'app-novogrupo',
  templateUrl: './novogrupo.page.html',
  styleUrls: ['./novogrupo.page.scss'],
})
export class NovogrupoPage implements OnInit {

  public formGroup: FormGroup;
  public grupo: Grupo = {
    id: null,
    nome: ''
  };
  public loading: any;

  constructor(
    private loadingController: LoadingController,
    private musicaService: MusicaService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [[Validators.required]],
      nome: [[Validators.required]],
    });
   }

  ngOnInit() {
  }

  public async novoGrupo() {
    await this.presentLoading();
    try {
      console.log(this.grupo)
      await this.musicaService.novoGrupo(this.grupo)
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
