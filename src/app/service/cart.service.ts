import {Injectable} from '@angular/core';
import {ProductDto} from '../dto/ProductDto';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly productList: ProductDto[] = [];
  cartForm: FormGroup;

  constructor() {
    this.productList = JSON.parse(sessionStorage.getItem('cart') ?? '[]');
    this.cartForm = new FormGroup({});
  }

  addItem(product: ProductDto): void {
    const productItem = {...product}
    const productExistent = this.productList.find(item => item.id === productItem.id);
    if (productExistent) {
      productExistent.quantity += productItem.quantity;
      this.syncItems();
      return;
    }

    this.productList.push(productItem);
    this.syncItems();
  }

  removeItem(product: ProductDto): void {
    const index = this.productList.indexOf(product);
    this.productList.splice(index, 1);
    this.syncItems();
  }

  listCartItems(): ProductDto[] {
    return this.productList;
  }

  syncItems(): void {
    sessionStorage.setItem('items', JSON.stringify(this.productList));
  }
}
