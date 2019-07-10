import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  public email: string;

  constructor(
    public storage: StorageService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.email = localUser.email
    }
  }
}
