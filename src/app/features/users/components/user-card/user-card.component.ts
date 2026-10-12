import {Component, computed, input} from '@angular/core';
import {User} from '../../../../api/generated/models/user';
import {TruncatePipe} from '../../../../shared/pipes/truncate.pipe';
import {displayName} from '../../../../shared/utils/display-name';

@Component({
  selector: 'app-user-card',
  imports: [TruncatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCard {
  readonly user = input.required<User>();
  protected readonly name = computed(() =>
    displayName(this.user().firstName, this.user().lastName),
  );
  protected readonly initials = computed(() => {
    const user = this.user();
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });
}
