import { Strain } from '../product/product.model';

export type SortCriterion = 'POPULAR' | 'PRICE' | 'THC' | 'ALPHABETICAL';
export type CriteriaOptions = {
  label: string;
  value: SortCriterion;
}[];

export type SortDirection = 'ASC' | 'DESC';
export type DirectionOptions = {
  label: string;
  value: SortDirection;
}[];

export type Options = { label: string; value: string }[];

export type StrainOptions = {
  label: string;
  value: Strain;
}[];

export type PotencyRange = { lower: number; upper: number };

export type ProductFilterField =
  | 'sortMethod.criterion'
  | 'sortMethod.direction'
  | 'brands'
  | 'strains'
  | 'weights'
  | 'potency.thc';
export type ProductFilters = {
  [key: string]: any;
  sortMethod: { criterion: SortCriterion; direction: SortDirection };
  brands: string[];
  strains: Strain[];
  weights: string[];
  potency: { thc: PotencyRange };
};

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  sortMethod: { criterion: 'POPULAR', direction: 'DESC' },
  brands: [],
  strains: [],
  weights: [],
  potency: { thc: { lower: 0, upper: 100 } },
};

export const OPTIONS_CRITERIA: CriteriaOptions = [
  { label: 'Popular', value: 'POPULAR' },
  { label: 'Price', value: 'PRICE' },
  { label: 'THC', value: 'THC' },
  { label: 'A-Z', value: 'ALPHABETICAL' },
];

export const OPTIONS_DIRECTIONS: DirectionOptions = [
  { label: 'Low to High', value: 'ASC' },
  { label: 'High to Low', value: 'DESC' },
];

export const OPTIONS_STRAINS: StrainOptions = [
  { label: 'Hybrid', value: 'HYBRID' },
  { label: 'Indica', value: 'INDICA' },
  { label: 'Sativa', value: 'SATIVA' },
];

export const OPTIONS_WEIGHTS: Options = [
  { label: '1/8oz', value: '1/8oz' },
  { label: '1/4oz', value: '1/4oz' },
  { label: '1/2oz', value: '1/2oz' },
  { label: '1oz', value: '1oz' },
  { label: '0.5g', value: '0.5g' },
  { label: '1g', value: '1g' },
  { label: '2g', value: '2g' },
];
