import {HttpClient} from '@angular/common/http';
import {Service, inject} from '@angular/core';
import {Observable, delay, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from '../models/user';

const mockUsers: User[] = [
  {
    id: 'usr-1',
    firstName: 'Jhon',
    lastName: 'Doe',
    email: 'jhon.doe@example.com',
    role: 'admin',
  },
  {
    id: 'usr-2',
    firstName: 'Jonas',
    lastName: 'Keller',
    email: 'jonas.keller@example.com',
    role: 'editor',
  },
  {
    id: 'usr-3',
    firstName: 'Sofia',
    lastName: 'Martins',
    email: 'sofia.martins@example.com',
    role: 'viewer',
  },
];

@Service()
export class UsersService {
  private readonly http = inject(HttpClient);

  list(): Observable<User[]> {
    if (environment.useMockApi) {
      return of(mockUsers).pipe(delay(200));
    }
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}
