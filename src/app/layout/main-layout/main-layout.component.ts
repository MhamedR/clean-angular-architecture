import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppErrors} from '../../core/error-handling/app-errors.service';
import {Header} from '../header/header.component';
import {Sidebar} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayout {
  protected readonly errors = inject(AppErrors);
}
