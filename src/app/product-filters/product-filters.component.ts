import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

import { ProductsService } from '../products.service';

import {
  DEFAULT_PRODUCT_FILTERS,
  OPTIONS_CRITERIA,
  OPTIONS_DIRECTIONS,
  OPTIONS_STRAINS,
  OPTIONS_WEIGHTS,
  ProductFilters,
  ProductFilterField,
  Options,
  CriteriaOptions,
  DirectionOptions,
  StrainOptions,
} from './product-filters.model';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit {
  constructor(private productService: ProductsService) {
    addIcons({ close });
  }

  isModalOpen = false;

  filters: ProductFilters = DEFAULT_PRODUCT_FILTERS;

  // TODO replace with parsed data from products array - getProductFilterOptions within product service
  criteriaOptions: CriteriaOptions = OPTIONS_CRITERIA;
  directionOptions: DirectionOptions = OPTIONS_DIRECTIONS;
  brandOptions: Options = [
    { label: 'Brand 1', value: 'Brand 1' },
    { label: 'Brand 2', value: 'Brand 2' },
    { label: 'Brand 3', value: 'Brand 3' },
    { label: 'Brand 4', value: 'Brand 4' },
  ];
  strainOptions: StrainOptions = OPTIONS_STRAINS;
  weightOptions: Options = OPTIONS_WEIGHTS;

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleFilterUpdate() {
    console.log(this.filters);
    this.productService.updateProductFilters(this.filters);
  }

  handleChangeField(e: CustomEvent, field: ProductFilterField) {
    this.filters[field] = e.detail.value;
    this.handleFilterUpdate();
  }

  isChecked(array: any, value: string): boolean {
    return array.includes(value);
  }

  handleCheckField(
    isChecked: boolean,
    value: string,
    field: ProductFilterField
  ) {
    if (!isChecked) {
      this.filters[field] = this.filters[field].filter(
        (v: string) => v !== value
      );
      this.handleFilterUpdate();
      return;
    }

    if (!this.isChecked(this.filters[field], value))
      this.filters[field].push(value);
    this.handleFilterUpdate();
  }
}
