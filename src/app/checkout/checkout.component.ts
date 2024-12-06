import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent  implements OnInit {
  @Input() checkoutUrl: string = ''; // Accept the URL as an input

  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly location: Location) {}

  ngOnInit() {
    if (!this.checkoutUrl) {
      console.error('No checkout URL provided for the iframe.');
    }
  }

  goBack() {
    this.back.emit();
  }
}
