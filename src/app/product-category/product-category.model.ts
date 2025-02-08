export type ProductCategory =
  | 'FLOWER'
  | 'PREROLL'
  | 'VAPE'
  | 'CONCENTRATES'
  | 'BEVERAGE'
  | 'TINCTURES'
  | 'EDIBLE'
  | 'ACCESSORIES';

  export interface CategoryWithImage {
    category: ProductCategory;
    imageUrl: string;
  }