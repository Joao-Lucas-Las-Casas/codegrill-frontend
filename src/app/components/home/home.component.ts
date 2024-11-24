import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductDto} from '../../dto/ProductDto';
import {CommentsDto} from '../../dto/CommentsDto';
import {ProdutosService} from '../../service/produtos.service';
import {ComentariosService} from '../../service/comentarios.service';
import {CartService} from '../../service/cart.service';
import {RouterLink} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-home',
  imports: [
    CurrencyPipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: ProductDto[] = [];
  productsCarrosel: ProductDto[] = [];
  activeIndex = 0;
  comments: CommentsDto[] = [];
  comment!: string;
  placeholder = "Escreva sua avaliação...";
  cartItems: ProductDto[] = [];
  totalValue: number = 0.0;
  logged: boolean = false;
  address: string | undefined;
  number: string | undefined;
  complement: string | undefined;


  constructor(private readonly produtoService: ProdutosService,
              private readonly commentsService: ComentariosService,
              private readonly cartService: CartService,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.listProducts();
    this.listComments();
    this.isLogged();
  }

  public listProducts() {
    this.produtoService.listProducts().subscribe(value => {
      this.products = value.content;
      this.productsCarrosel = this.products.filter((p) => p.introduction !== null);
    });
  }

  public listComments() {
    this.commentsService.listComments().subscribe(value => this.comments = value);
  }

  public sendComment(): void {
    if (!this.tokenValidator()) {
      alert("Para deixar sua avaliação, você deve estar logado!")
      return;
    }

    this.commentsService.sendComment(this.comment).subscribe(() => this.comment = "");
  }

  public tokenValidator() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  showCartItems() {
    this.cartItems = this.cartService.listCartItems();
  }

  addItem(product: ProductDto): void {
    product.quantity = 1;
    this.cartService.addItem(product);
    this.totalValue += product.price;
  }

  removeItem(product: ProductDto): void {
    this.cartService.removeItem(product);
    this.totalValue -= product.price * product.quantity;
  }


  public logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  private decodeToken(): string[] | null {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = jwtDecode(token);
      // @ts-ignore
      return jwt.roles;
    }
    return null;
  }

  public isAdmin(): boolean {
    const roles = this.decodeToken();
    return !!(roles !== null && roles.find(role => role === 'ROLE_ADMIN'));
  }

  public isLogged() {
    this.logged = this.userService.isLogged();
  }

  public submitOrder() {
    if (!this.address || !this.number) {
      alert('Para finalizar seu pedido, você deve informar seu endereço.');
      return;
    }
    alert('Pedido realizado! Seu pedido chegará logo.');
  }

  public removeProduct(id: number | undefined) {
    if (!id) {
      return;
    }

    this.produtoService.deleteProduct(id).subscribe(() => window.location.reload());
  }
}
