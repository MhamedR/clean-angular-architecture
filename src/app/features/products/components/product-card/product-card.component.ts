import {CurrencyPipe} from '@angular/common';
import {Component, input} from '@angular/core';
import {Product} from '../../../../api/generated/models/product';
import {TruncatePipe} from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, TruncatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
}
