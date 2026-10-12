import {Component, computed, inject} from '@angular/core';
import {PageHeader} from '../../../../shared/components/page-header/page-header.component';
import {ProductCard} from '../../components/product-card/product-card.component';
import {ProductsStore} from '../../store/products.store';

@Component({
  selector: 'app-product-list',
  imports: [PageHeader, ProductCard],
  providers: [ProductsStore],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductList {
  protected readonly store = inject(ProductsStore);
  protected readonly subtitle = computed(() =>
    this.store.loading() ? 'Loading…' : `${this.store.total()} items`,
  );

  protected onQuery(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.store.setQuery(target.value);
    }
  }
}
