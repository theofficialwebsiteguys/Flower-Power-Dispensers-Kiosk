export type Strain = 'HYBRID' | 'INDICA' | 'SATIVA';

export type Product = {
  [key: string]: any;
  category: string;
  title: string;
  desc: string;
  brand: string;
  strainType: Strain;
  thc: string;
  weight: string;
  price: string;
  image: string;
};
