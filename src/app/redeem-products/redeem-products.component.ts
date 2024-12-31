import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../products.service';
import { ProductCategory } from '../product-category/product-category.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-redeem-products',
  templateUrl: './redeem-products.component.html',
  styleUrls: ['./redeem-products.component.scss'],
})
export class RedeemProductsComponent  implements OnInit {
  @Input() userPoints: number = 0;
  
  products: Array<Product & { points: number }> = []; // Include points with each product
  redeemProductIds = ['cf4e02c37df4bd37', '770a696056c501ee', '1034f2b53cf785f9', 'e2d3549ca1fa0a54']; 

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProductsByIds(this.redeemProductIds).subscribe(
      (products) => {
        // Sort products to match the order of redeemProductIds
        const sortedProducts = products.sort(
          (a, b) =>
            this.redeemProductIds.indexOf(a.id) - this.redeemProductIds.indexOf(b.id)
        );
  
        // Assign points after sorting
        this.products = sortedProducts.map((product, index) => ({
          ...product,
          points: this.getPointsForProduct(index), // Assign points based on index or custom logic
        }));
      },
      (error) => {
        console.error('Error fetching redemption products:', error);
      }
    );
  }

  handleProductClick(product: Product & { points: number }): void {
    if (this.userPoints < product.points) {
      alert('You do not have enough points to redeem this product.');
      return;
    }

    const confirmAdd = confirm(`Add ${product.title} to cart for ${product.points} points?`);
    if (confirmAdd) {
      this.addToCart(product);
    }
  }

  addToCart(product: Product & { points: number }): void {
    const { points, ...productWithoutPoints } = product; // Exclude 'points'
    const productWithQuantity = { ...productWithoutPoints, quantity: 1 }; // Add 'quantity: 1'
    this.cartService.addToCart(productWithQuantity);
  }
  

  // Example function to define points for products
  private getPointsForProduct(index: number): number {
    const pointsArray = [10, 10, 50, 65]; // Example points values
    return pointsArray[index] || 1000; // Default to 1000 if index exceeds array length
  }
}
