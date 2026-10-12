import {Routes} from '@angular/router';
import {ProductList} from './pages/product-list/product-list.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductList,
  },
];
