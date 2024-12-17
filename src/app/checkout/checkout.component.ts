import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnChanges {
  private _checkoutUrl: string = '';
  sanitizedUrl: SafeResourceUrl | null = null;

  @Input()
  set checkoutUrl(value: string) {
    this._checkoutUrl = value;
    if (value) {
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }
  get checkoutUrl(): string {
    return this._checkoutUrl;
  }

  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly location: Location, private readonly sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['checkoutUrl'] && !changes['checkoutUrl'].currentValue) {
      console.error('No checkout URL provided for the iframe.');
    } else {
      console.log('Checkout URL updated:', this.checkoutUrl);
    }
  }

  goBack() {
    this.back.emit();
  }
}
