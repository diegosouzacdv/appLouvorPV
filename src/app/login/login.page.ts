import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds = {
    username: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    //public auth: AuthService,
    public menu: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.enable(false);

  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login() {
   /* this.auth.logout();
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response['access_token']);
        this.navCtrl.navigateRoot('/tabs');
      })*/
  }

}
