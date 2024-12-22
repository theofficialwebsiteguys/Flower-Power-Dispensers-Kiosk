import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface CartItem {
  id: string;
  image: string;
  brand: string;
  desc: string;
  price: string;
  quantity: number;
  title: string;
  strainType: string;
  thc: string;
  weight: string;
}


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart'; // Key for storing the cart in localStorage
  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCart());
  cart$ = this.cartSubject.asObservable(); // Observable for the cart

  constructor(private http: HttpClient, private authService: AuthService) {
    // Initialize cart in localStorage if it doesn't exist
    if (!localStorage.getItem(this.cartKey)) {
      localStorage.setItem(this.cartKey, JSON.stringify([]));
    }
  }

  // Get the cart items from localStorage
  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Add an item to the cart
  addToCart(item: CartItem) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(
      (cartItem: CartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
  }

  // Update the quantity of a specific item in the cart
  updateQuantity(itemId: string, quantity: number) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex((cartItem: CartItem) => cartItem.id === itemId);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      this.saveCart(cart);
    }
  }

  // Remove an item from the cart
  removeFromCart(itemId: string) {
    const cart = this.getCart();
    const updatedCart = cart.filter((cartItem: CartItem) => cartItem.id !== itemId);
    this.saveCart(updatedCart);
  }

  // Clear the entire cart
  clearCart() {
    this.saveCart([]);
  }


  checkout(): Observable<any> {
    const cartItems = this.getCart(); // Retrieve the cart from localStorage
  
    // Build the cart payload
    const cartPayload: any = {
      items: cartItems.map(item => ({
        productId: item.id, // Map to the correct property for the API
        quantity: item.quantity,
      })),
      venueId: environment.venueId, // Replace with the appropriate venueId
    };
  

    // Check if cartID exists in localStorage
    const existingCartID = localStorage.getItem('cartID');
    if (existingCartID) {
      cartPayload.cartId = existingCartID; // Add cartId to payload if it exists
    }
    console.log(cartPayload)
    const headers = new HttpHeaders({
      'x-dispense-api-key': environment.flower_power_api_key,
    });
  
    return this.http.post<any>('https://api.dispenseapp.com/2023-03/carts', cartPayload, { headers }).pipe(
      switchMap((response) => {
        if (response.cartID) {
          localStorage.setItem('cartID', response.cartID);
        }
  
        if (response.checkoutUrl) {
          return this.authService.getUserInfo().pipe(
            map((userInfo: any) => {
              const token = userInfo.alpineToken;
              return `${response.checkoutUrl}?auth=${token}`;
            })
          );
        } else {
          return throwError(() => new Error('No checkout URL provided in response'));
        }
      })
    );
  }
  

  // Save the cart back to localStorage and notify subscribers
  private saveCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart); // Emit the updated cart
  }
}
