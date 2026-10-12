import {Service, signal} from '@angular/core';
import {errorMessage} from './error-message';

@Service()
export class AppErrors {
  private readonly current = signal<string | null>(null);
  readonly message = this.current.asReadonly();

  report(error: unknown): void {
    this.current.set(errorMessage(error));
  }

  clear(): void {
    this.current.set(null);
  }
}
