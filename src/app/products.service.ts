import { Injectable } from '@angular/core';
import { Product } from './product/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCategory } from './product-category/product-category.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();

  private currentCategory = new BehaviorSubject<ProductCategory>('FLOWER');
  currentCategory$ = this.currentCategory.asObservable();

   private currentProduct = new BehaviorSubject<Product | null>(null); // Start with null or a default Product
   currentProduct$ = this.currentProduct.asObservable();

  constructor(private http: HttpClient, private route: Router) {}

  fetchProducts(): void {
    this.http.get<Product[]>('https://your-api-endpoint.com/products')
      .subscribe((data) => {
        this.products.next(data); // Updates the BehaviorSubject with new data
      });
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  // Method to update the category
  updateCategory(category: ProductCategory) {
    this.currentCategory.next(category); // Updates the value in the BehaviorSubject
    this.route.navigateByUrl('/products');
  }

  getCurrentCategory(): ProductCategory {
    return this.currentCategory.value;
  }

  getCategories(): Array<ProductCategory> {
    return [
      'FLOWER',
      'PRE-ROLL',
      'CONCENTRATE',
      'VAPORIZER',
      'TOPICAL',
      'TINCTURE',
      'EDIBLE',
    ];
  }

  getProductsList(): Array<Product> {
    return [
      {
        category: 'FLOWER',
        title: 'Flower 1',
        brand: 'Brand 1',
        desc: 'A very long description about the flower 1 product that sells at flower power dispensary and is very potent. Enjoy this flower at night time or in the morning, or day .A very long description about the flower 1 product that sells at flower power dispensary and is very potent. Enjoy this flower at night time or in the morning, or day',
        strainType: 'SATIVA',
        thc: '20.3',
        weight: '3.5',
        price: '40',
        image: 'assets/default.jpg'
      },
      {
        category: 'FLOWER',
        title: 'Flower 2',
        brand: 'Brand 1',
        desc: '',
        strainType: 'INDICA',
        thc: '22.1',
        weight: '3.5',
        price: '45',
        image: 'assets/default.jpg'
      },
      {
        category: 'FLOWER',
        title: 'Flower 3',
        brand: 'Brand 2',
        desc: '',
        strainType: 'HYBRID',
        thc: '18.7',
        weight: '3.5',
        price: '40',
        image: 'assets/default.jpg'
      },
      {
        category: 'PRE-ROLL',
        title: 'Pre Roll 1',
        brand: 'Brand 1',
        desc: '',
        strainType: 'HYBRID',
        thc: '25.4',
        weight: '1',
        price: '15',
        image: 'assets/default.jpg'
      },
      {
        category: 'PRE-ROLL',
        title: 'Pre Roll 2',
        brand: 'Brand 2',
        desc: '',
        strainType: 'SATIVA',
        thc: '19.6',
        weight: '1',
        price: '10',
        image: 'assets/default.jpg'
      },
      {
        category: 'PRE-ROLL',
        title: 'Pre Roll 3',
        brand: 'Brand 2',
        desc: '',
        strainType: 'SATIVA',
        thc: '20.3',
        weight: '2',
        price: '15',
        image: 'assets/default.jpg'
      },
      {
        category: 'VAPORIZER',
        title: 'Vaporizer 1',
        brand: 'Brand 1',
        desc: '',
        strainType: 'INDICA',
        thc: '22.1',
        weight: '0.5',
        price: '45',
        image: 'assets/default.jpg'
      },
      {
        category: 'CONCENTRATE',
        title: 'Concentrate 1',
        brand: 'Brand 1',
        desc: '',
        strainType: 'INDICA',
        thc: '88.7',
        weight: '1',
        price: '90',
        image: 'assets/default.jpg'
      },
      {
        category: 'CONCENTRATE',
        title: 'Concentrate 2',
        brand: 'Brand 2',
        desc: '',
        strainType: 'HYBRID',
        thc: '85.2',
        weight: '1',
        price: '85',
        image: 'assets/default.jpg'
      },
    ];
  }

  // Method to update the current product
  updateCurrentProduct(product: Product) {
    this.currentProduct.next(product);
    console.log(product);
    this.route.navigateByUrl('/product-display');
  }

  // Method to get the current product directly (optional)
  getCurrentProduct(): Product | null {
    return this.currentProduct.value;
  }

  getSimilarProducts(){
    return this.getProductsList();
  }

}
