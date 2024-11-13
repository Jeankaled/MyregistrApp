import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardServiceService } from './auth-guard.service.service';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  
  {
    path: 'home',
    loadChildren: () => import('./home-estudiante/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuardServiceService]

  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'home-docente',
    loadChildren: () => import('./home-docente/home-docente.module').then( m => m.HomeDocentePageModule),
    canActivate:[AuthGuardServiceService]

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
