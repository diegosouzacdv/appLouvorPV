import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full'},
 { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
 { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',  canActivate: [LoginGuard] },
  { path: 'new', loadChildren: './novo-usuario/novo-usuario.module#NovoUsuarioPageModule', canActivate: [AuthGuard]  },
  { path: 'pessoal', loadChildren: './tab3/dados-pessoais/dados-pessoais.module#DadosPessoaisPageModule', canActivate: [AuthGuard]  },
  { path: 'funcoes', loadChildren: './tab3/funcoes/funcoes.module#FuncoesPageModule', canActivate: [AuthGuard]  },
  { path: 'repertorio/:id', loadChildren: './tab1/repertorio/repertorio.module#RepertorioPageModule', canActivate: [AuthGuard]  },
  { path: 'musica/:id', loadChildren: './tab2/musica/musica.module#MusicaPageModule', canActivate: [AuthGuard]  },
  { path: 'allUser', loadChildren: './tab4/all-user/all-user.module#AllUserPageModule', canActivate: [AuthGuard]  },
  { path: 'novosusuarios', loadChildren: './tab4/novos-usuarios/novos-usuarios.module#NovosUsuariosPageModule' },
  { path: 'musicas', loadChildren: './tab4/musicas/musicas.module#MusicasPageModule' },
  { path: 'editarmusica/:id', loadChildren: './tab4/musicas/editar-musica/editar-musica.module#EditarMusicaPageModule' },



];

@NgModule({
  imports: [
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
