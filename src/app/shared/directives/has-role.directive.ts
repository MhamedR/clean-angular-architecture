import {Directive, TemplateRef, ViewContainerRef, effect, inject, input} from '@angular/core';
import {KeycloakAuth} from '../../core/auth/keycloak-auth.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRole {
  readonly appHasRole = input.required<string>();

  private readonly template = inject(TemplateRef);
  private readonly view = inject(ViewContainerRef);
  private readonly auth = inject(KeycloakAuth);

  constructor() {
    effect(() => {
      const role = this.appHasRole();
      this.auth.session();
      this.view.clear();
      if (this.auth.hasRole(role)) {
        this.view.createEmbeddedView(this.template);
      }
    });
  }
}
