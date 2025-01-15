import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
})
export class RecentOrdersComponent  implements OnInit {
  pendingOrders: any[] = [];
  pastOrders: any[] = [];

  expandedOrderIndex: { pending: number | null; past: number | null } = {
    pending: null,
    past: null,
  }; // Tracks which order is expanded

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to the orders observable to get updates
    this.authService.orders.subscribe((orders) => {
      this.pendingOrders = orders.filter((order) => !order.complete);
      this.pastOrders = orders.filter((order) => order.complete);
      console.log('Pending Orders:', this.pendingOrders);
      console.log('Past Orders:', this.pastOrders);
    });
  }

  toggleExpand(index: number, section: 'pending' | 'past'): void {
    // Toggle expansion for the specific section
    this.expandedOrderIndex[section] =
      this.expandedOrderIndex[section] === index ? null : index;
  }

  reorder(order: any): void {
    order.items.forEach((item: any) => {
      const cartItem: CartItem = {
        id: item.id,
        posProductId: item.posProductId,
        image: item.image,
        brand: item.brand,
        desc: item.desc,
        price: item.price,
        quantity: item.quantity,
        title: item.title,
        strainType: item.strainType,
        thc: item.thc,
        weight: item.weight,
      };
      this.cartService.addToCart(cartItem);
    });
    console.log('Order added to cart:', order);
  }
}
