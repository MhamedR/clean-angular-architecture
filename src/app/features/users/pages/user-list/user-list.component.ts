import {Component, computed, inject} from '@angular/core';
import {PageHeader} from '../../../../shared/components/page-header/page-header.component';
import {UserCard} from '../../components/user-card/user-card.component';
import {UsersStore} from '../../store/users.store';

@Component({
  selector: 'app-user-list',
  imports: [PageHeader, UserCard],
  providers: [UsersStore],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserList {
  protected readonly store = inject(UsersStore);
  protected readonly subtitle = computed(() =>
    this.store.loading() ? 'Loading…' : `${this.store.total()} accounts`,
  );

  protected onQuery(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.store.setQuery(target.value);
    }
  }
}
