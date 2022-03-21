import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productGuardService } from './productGuard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeGuardService } from './homeguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
    canActivate: [productGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [HomeGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
