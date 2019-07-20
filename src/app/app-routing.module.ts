import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'novo-usuario', loadChildren: './novo-usuario/novo-usuario.module#NovoUsuarioPageModule' },
  { path: 'pessoal', loadChildren: './tab3/dados-pessoais/dados-pessoais.module#DadosPessoaisPageModule' },
  { path: 'funcoes', loadChildren: './tab3/funcoes/funcoes.module#FuncoesPageModule' },
  { path: 'repertorio/:id', loadChildren: './tab1/repertorio/repertorio.module#RepertorioPageModule' },
  { path: 'musica/:id', loadChildren: './tab2/musica/musica.module#MusicaPageModule' },
  { path: 'allUser', loadChildren: './tab4/all-user/all-user.module#AllUserPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
