import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

import {
  DEFAULT_FILTERS,
  Filters,
  OPTIONS_CRITERIA,
  OPTIONS_DIRECTIONS,
  CriteriaOptions,
  DirectionOptions,
  StrainOptions,
  OPTIONS_STRAINS,
  Strain,
  WeightOptions,
  OPTIONS_WEIGHTS,
  Weight,
} from './product-filters.model';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit {
  constructor() {
    addIcons({ close });
  }

  @Output() updateFilters = new EventEmitter<Filters>();

  // TODO set to false
  isModalOpen = true;

  filters: Filters = DEFAULT_FILTERS;

  criteriaOptions: CriteriaOptions = OPTIONS_CRITERIA;
  directionOptions: DirectionOptions = OPTIONS_DIRECTIONS;
  strainOptions: StrainOptions = OPTIONS_STRAINS;
  weightOptions: WeightOptions = OPTIONS_WEIGHTS;

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleFilterUpdate() {
    console.log(this.filters);
    this.updateFilters.emit(this.filters);
  }

  handleChangeCriteria(e: CustomEvent) {
    this.filters.sortMethod.criterion = e.detail.value;
    this.handleFilterUpdate();
  }

  handleChangeDirection(e: CustomEvent) {
    this.filters.sortMethod.direction = e.detail.value;
    this.handleFilterUpdate();
  }

  isChecked(array: any, value: string): boolean {
    return array.includes(value);
  }

  handleCheckStrain(isChecked: boolean, strain: Strain) {
    if (!isChecked) {
      this.filters.strains = this.filters.strains.filter((s) => s !== strain);
      this.handleFilterUpdate();
      return;
    }

    if (!this.isChecked(this.filters.strains, strain))
      this.filters.strains.push(strain);
    this.handleFilterUpdate();
  }

  handleCheckWeight(isChecked: boolean, weight: Weight) {
    if (!isChecked) {
      this.filters.weights = this.filters.weights.filter((w) => w !== weight);
      this.handleFilterUpdate();
      return;
    }

    if (!this.isChecked(this.filters.weights, weight))
      this.filters.weights.push(weight);
    this.handleFilterUpdate();
  }
}
