import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageDto} from '../dto/PageDto';
import {ProductDto} from '../dto/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private readonly http: HttpClient) {
  }

  public listProducts(): Observable<PageDto<ProductDto>> {
    return this.http.get<PageDto<ProductDto>>('http://localhost:8080/v1/products');
  }

  public addProduct(product: ProductDto): Observable<void> {
    return this.http.post<void>('http://localhost:8080/v1/products', {
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      discount: product.discount,
      category: product.category,
      introduction: product.introduction
    });
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/v1/products/${id}`);
  }

  public findById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`http://localhost:8080/v1/products/${id}`);
  }

  public update(product: ProductDto): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/v1/products/${product.id}`, product);
  }
}
