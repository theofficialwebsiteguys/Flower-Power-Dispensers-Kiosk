export type ProductCategory =
  | 'FLOWER'
  | 'PRE_ROLLS'
  | 'VAPORIZERS'
  | 'CONCENTRATES'
  | 'BEVERAGES'
  | 'TINCTURES'
  | 'EDIBLES'
  | 'ACCESSORIES';

  export interface CategoryWithImage {
    category: ProductCategory;
    imageUrl: string;
  }