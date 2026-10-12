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
import {Product} from '../../../api/generated/models/product';
import {ProductsService} from '../../../api/generated/services/products.service';
import {errorMessage} from '../../../core/error-handling/error-message';

interface ProductsState {
  products: Product[];
  query: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  query: '',
  loading: false,
  error: null,
};

export const ProductsStore = signalStore(
  withState(initialState),
  withComputed(({products, query}) => ({
    filteredProducts: computed(() => {
      const term = query().trim().toLowerCase();
      if (!term) {
        return products();
      }
      return products().filter((product) =>
        `${product.name} ${product.sku}`.toLowerCase().includes(term),
      );
    }),
    total: computed(() => products().length),
  })),
  withMethods((store) => {
    const api = inject(ProductsService);
    return {
      setQuery(query: string): void {
        patchState(store, {query});
      },
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, {loading: true, error: null})),
          switchMap(() =>
            api.list().pipe(
              tap((products) => patchState(store, {products, loading: false})),
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
