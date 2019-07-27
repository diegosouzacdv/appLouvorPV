import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovosUsuariosPage } from './novos-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: NovosUsuariosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovosUsuariosPage]
})
export class NovosUsuariosPageModule {}
