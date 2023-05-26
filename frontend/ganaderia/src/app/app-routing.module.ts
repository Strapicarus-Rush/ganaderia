import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
  //   canActivate: [authGuard]
  // },
  
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   // loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
  //   canActivate: [authGuard]
  // },
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    // component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
