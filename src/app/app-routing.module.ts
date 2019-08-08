import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full'},
 { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
 { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',  canActivate: [LoginGuard] },
  { path: 'new', loadChildren: './novo-usuario/novo-usuario.module#NovoUsuarioPageModule', canActivate: [AuthGuard]  },
  { path: 'pessoal', loadChildren: './tab3/dados-pessoais/dados-pessoais.module#DadosPessoaisPageModule'  },
  { path: 'funcoes', loadChildren: './tab3/funcoes/funcoes.module#FuncoesPageModule' },
  { path: 'repertorio/:id', loadChildren: './tab1/repertorio/repertorio.module#RepertorioPageModule'  },
  { path: 'musica/:id', loadChildren: './tab2/musica/musica.module#MusicaPageModule'  },
  { path: 'allUser', loadChildren: './tab4/all-user/all-user.module#AllUserPageModule'  },
  { path: 'novosusuarios', loadChildren: './tab4/novos-usuarios/novos-usuarios.module#NovosUsuariosPageModule' },
  { path: 'musicas', loadChildren: './tab4/musicas/musicas.module#MusicasPageModule' },
  { path: 'editarmusica/:id', loadChildren: './tab4/musicas/editar-musica/editar-musica.module#EditarMusicaPageModule' },
  { path: 'novamusica', loadChildren: './tab4/novamusica/novamusica.module#NovamusicaPageModule' },
  { path: 'grupos', loadChildren: './tab4/grupos/grupos.module#GruposPageModule' },
  { path: 'editargrupo/:id', loadChildren: './tab4/grupos/editargrupo/editargrupo.module#EditargrupoPageModule' },
  { path: 'novogrupo', loadChildren: './tab4/novogrupo/novogrupo.module#NovogrupoPageModule' },
  { path: 'repertorios', loadChildren: './tab4/repertorios/repertorios.module#RepertoriosPageModule' },
  { path: 'editarrepertorio/:id', loadChildren: './tab4/repertorios/editarrepertorio/editarrepertorio.module#EditarrepertorioPageModule' },





];

@NgModule({
  imports: [
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
