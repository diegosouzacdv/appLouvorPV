import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'novo-usuario', loadChildren: './novo-usuario/novo-usuario.module#NovoUsuarioPageModule' },
  { path: 'pessoal', loadChildren: './tab3/dados-pessoais/dados-pessoais.module#DadosPessoaisPageModule' }



 // { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
 // { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
 // { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
