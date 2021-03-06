import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { VisorComponent } from './components/visor/visor.component';
import { LoginGuard } from './login/login.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',//aqui se cambia el redirect a login
    pathMatch: 'full'
    },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'navbar', component: NavbarComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'visor', component: VisorComponent },
  /*{
    path: '',
    loadChildren: () => import('./pages/log/log.module').then( m => m.LogPageModule)
  }*/
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
