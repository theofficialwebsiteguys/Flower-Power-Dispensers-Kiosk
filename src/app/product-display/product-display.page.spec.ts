import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDisplayPage } from './product-display.page';

describe('ProductDisplayPage', () => {
  let component: ProductDisplayPage;
  let fixture: ComponentFixture<ProductDisplayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
