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

export type Strain = 'HYBRID' | 'INDICA' | 'SATIVA';
export type StrainOptions = {
  label: string;
  value: Strain;
}[];

export type Weight = '1/8' | '1/4' | '1/2' | '1';
export type WeightOptions = { label: string; value: Weight }[];

export type Filters = {
  sortMethod: { criterion: SortCriterion; direction: SortDirection };
  strains: Strain[];
  weights: Weight[];
};

export const DEFAULT_FILTERS: Filters = {
  sortMethod: { criterion: 'POPULAR', direction: 'DESC' },
  strains: [],
  weights: [],
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

export const OPTIONS_WEIGHTS: WeightOptions = [
  { label: '1/8oz', value: '1/8' },
  { label: '1/4oz', value: '1/4' },
  { label: '1/2oz', value: '1/2' },
  { label: '1oz', value: '1' },
];
