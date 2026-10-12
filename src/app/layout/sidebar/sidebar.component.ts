import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {HasRole} from '../../shared/directives/has-role.directive';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, HasRole],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class Sidebar {
  protected readonly links: readonly NavLink[] = [
    {path: '/users', label: 'Users'},
    {path: '/products', label: 'Products'},
  ];
}
