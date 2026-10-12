import {Routes} from '@angular/router';
import {UserList} from './pages/user-list/user-list.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UserList,
  },
];
