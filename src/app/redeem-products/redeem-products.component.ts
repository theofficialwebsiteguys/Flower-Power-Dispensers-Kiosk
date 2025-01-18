import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../products.service';
import { ProductCategory } from '../product-category/product-category.model';
import { CartService } from '../cart.service';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-redeem-products',
  templateUrl: './redeem-products.component.html',
  styleUrls: ['./redeem-products.component.scss'],
})
export class RedeemProductsComponent  implements OnInit {
  @Input() userPoints: number = 0;
  
  products: Array<Product & { points: number }> = [];
  redeemProductIds = ['', '', '', '']; 

  constructor(private productsService: ProductsService, private cartService: CartService, private accessibilityService: AccessibilityService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProductsByIds(this.redeemProductIds).subscribe(
      (products) => {
        const sortedProducts = products.sort(
          (a, b) =>
            this.redeemProductIds.indexOf(a.id) - this.redeemProductIds.indexOf(b.id)
        );
  
        this.products = sortedProducts.map((product, index) => ({
          ...product,
          points: this.getPointsForProduct(index),
        }));

        this.accessibilityService.announce('Redemption products loaded.', 'polite');
      },
      (error) => {
        console.error('Error fetching redemption products:', error);
        this.accessibilityService.announce('Error loading redemption products.', 'assertive');
      }
    );
  }

  handleProductClick(product: Product & { points: number }): void {
    if (this.userPoints < product.points) {
      this.accessibilityService.announce('Not enough points to redeem this product.', 'assertive');
      alert('You do not have enough points to redeem this product.');
      return;
    }

    const confirmAdd = confirm(`Add ${product.title} to cart for ${product.points} points?`);
    if (confirmAdd) {
      this.addToCart(product);
    }
  }

  addToCart(product: Product & { points: number }): void {
    const { points, ...productWithoutPoints } = product;
    const productWithQuantity = { ...productWithoutPoints, quantity: 1 };
    this.cartService.addToCart(productWithQuantity);
    this.accessibilityService.announce(`${product.title} has been added to your cart.`, 'assertive');
  }
  

  private getPointsForProduct(index: number): number {
    const pointsArray = [10, 10, 50, 65]; 
    return pointsArray[index] || 1000;
  }
}
