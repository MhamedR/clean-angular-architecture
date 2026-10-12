import {HttpClient} from '@angular/common/http';
import {Service, inject} from '@angular/core';
import {Observable, delay, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Product} from '../models/product';

const mockProducts: Product[] = [
  {
    id: 'prd-1',
    name: 'Field notebook',
    sku: 'NB-100',
    price: 18,
    description: 'Plain paper notebook with a stitched binding and a cloth cover.',
  },
  {
    id: 'prd-2',
    name: 'Ceramic pour-over',
    sku: 'BR-240',
    price: 42,
    description: 'Stoneware dripper sized for a single cup, finished in a matte glaze.',
  },
  {
    id: 'prd-3',
    name: 'Linen apron',
    sku: 'AP-018',
    price: 36,
    description:
      'Hand-stitched linen apron for studio work, with a chest pocket and an adjustable neck strap.',
  },
];

@Service()
export class ProductsService {
  private readonly http = inject(HttpClient);

  list(): Observable<Product[]> {
    if (environment.useMockApi) {
      return of(mockProducts).pipe(delay(200));
    }
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }
}
