import {ErrorHandler, Service, inject} from '@angular/core';
import {AppErrors} from './app-errors.service';

@Service({autoProvided: false})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly errors = inject(AppErrors);
  private reporting = false;

  handleError(error: unknown): void {
    console.error(error);
    if (this.reporting) {
      return;
    }
    this.reporting = true;
    this.errors.report(error);
    this.reporting = false;
  }
}
