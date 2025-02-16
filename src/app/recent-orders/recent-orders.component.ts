import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartItem, CartService } from '../cart.service';
import { AccessibilityService } from '../accessibility.service';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
})
export class RecentOrdersComponent  implements OnInit {
  pendingOrders: any[] = [];
  pastOrders: any[] = [];
  loading: boolean = true; 
  expandedOrderIndex: { pending: number | null; past: number | null } = {
    pending: null,
    past: null,
  }; 

  constructor(private authService: AuthService, private cartService: CartService, private accessibilityService: AccessibilityService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true; // ✅ Start loading
  
    this.authService.orders.subscribe((orders) => {
      console.log("New orders received:", orders);
  
      // ✅ Check if it's still loading (null case)
      if (orders === null) {
        this.pendingOrders = [];
        this.pastOrders = [];
        this.loading = true;
        return;
      }
  
      this.loading = false; // ✅ Stop loading after data arrives
  
      // Sort and categorize orders
      this.pendingOrders = orders.filter((order) => !order.complete);
      this.pastOrders = orders.filter((order) => order.complete);
    });
  
    // ✅ Fetch new orders when component initializes
    this.authService.getUserOrders().then(() => {
      console.log("Orders refreshed.");
    });
  }
  
  

  
getLatestStatus(order: any): string {
  if (order.status_list && order.status_list.length > 0) {
    return order.status_list.reduce((latest: any, current: any) => 
      new Date(current.created_at) > new Date(latest.created_at) ? current : latest
    ).customer_message;
  }
  return '';
}

async sendStatusNotification(userId: number, statusMessage: string) {
  const payload = { 
    userId, 
    title: 'Order Update', 
    body: `Your order status: ${statusMessage}` 
  };

  const sessionData = localStorage.getItem('sessionData');
  const token = sessionData ? JSON.parse(sessionData).token : null;

  const headers = {
    Authorization: token,
    'Content-Type': 'application/json'
  };

  try {
    await CapacitorHttp.post({
      url: `${environment.apiUrl}/notifications/send-push`,
      headers,
      data: payload
    });
    console.log('Order status notification sent:', statusMessage);
  } catch (error) {
    console.error('Error sending notification', error);
  }
}

  toggleExpand(index: number, section: 'pending' | 'past'): void {
    const isExpanded = this.expandedOrderIndex[section] === index;
    this.expandedOrderIndex[section] = isExpanded ? null : index;

    const message = isExpanded
      ? `Order ${section} #${index + 1} collapsed.`
      : `Order ${section} #${index + 1} expanded.`;
    this.accessibilityService.announce(message, 'polite');
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
        category: item.category
      };
      this.cartService.addToCart(cartItem);
    });
    const message = `Order #${order.id_order} items have been added to your cart.`;
    this.accessibilityService.announce(message, 'assertive');
    console.log('Order added to cart:', order);
  }
}
