import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditarrepertorioPage } from './editarrepertorio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarrepertorioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarrepertorioPage]
})
export class EditarrepertorioPageModule {}
