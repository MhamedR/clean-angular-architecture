import {computed, inject} from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {EMPTY, catchError, pipe, switchMap, tap} from 'rxjs';
import {User} from '../../../api/generated/models/user';
import {UsersService} from '../../../api/generated/services/users.service';
import {errorMessage} from '../../../core/error-handling/error-message';

interface UsersState {
  users: User[];
  query: string;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  query: '',
  loading: false,
  error: null,
};

export const UsersStore = signalStore(
  withState(initialState),
  withComputed(({users, query}) => ({
    filteredUsers: computed(() => {
      const term = query().trim().toLowerCase();
      if (!term) {
        return users();
      }
      return users().filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(term),
      );
    }),
    total: computed(() => users().length),
  })),
  withMethods((store) => {
    const api = inject(UsersService);
    return {
      setQuery(query: string): void {
        patchState(store, {query});
      },
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, {loading: true, error: null})),
          switchMap(() =>
            api.list().pipe(
              tap((users) => patchState(store, {users, loading: false})),
              catchError((error: unknown) => {
                patchState(store, {loading: false, error: errorMessage(error)});
                return EMPTY;
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
