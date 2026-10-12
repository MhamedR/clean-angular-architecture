import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';
import {MainLayout} from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'users'},
      {
        path: 'users',
        title: 'Users',
        canActivate: [authGuard],
        loadChildren: () => import('./features/users/users.routes').then((m) => m.usersRoutes),
      },
      {
        path: 'products',
        title: 'Products',
        canActivate: [authGuard, roleGuard('product-viewer')],
        loadChildren: () =>
          import('./features/products/products.routes').then((m) => m.productsRoutes),
      },
    ],
  },
];
