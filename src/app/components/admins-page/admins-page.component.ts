import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ProductDto} from '../../dto/ProductDto';
import {ProdutosService} from '../../service/produtos.service';
import {NgxMaskDirective} from 'ngx-mask';

@Component({
  selector: 'app-admins-page',
  imports: [
    RouterLink,
    FormsModule,
    NgxMaskDirective
  ],
  templateUrl: './admins-page.component.html',
  styleUrl: './admins-page.component.css'
})
export class AdminsPageComponent implements OnInit {
  title: string = "Cadastro de Produtos";
  product: ProductDto = {
    name: "",
    description: "",
    image: "",
    price: 0.0,
    discount: 0,
    category: "",
    introduction: "",
    quantity: 0,
  };

  constructor(private readonly productService: ProdutosService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUrlId();
  }

  public addProduct(): void {
    if (this.product.id) {
      this.productService.update(this.product).subscribe(() => window.location.reload());
      return;
    }
    this.productService.addProduct(this.product).subscribe(() => window.location.reload());
  }

  public getUrlId() {
    this.route.paramMap.subscribe((params: any) => this.product.id = params.params['id']);

    if (this.product.id) {
      this.productService.findById(this.product.id).subscribe({
        next: (product: ProductDto) => {
          this.product = product;
          this.title = 'Atualização de Produtos';
        },
        error: () => {
          this.router.navigate(['/']).then();
        }
      });
    }
  }
}
