export type Strain = 'HYBRID' | 'INDICA' | 'SATIVA';

export type Product = {
  [key: string]: any;
  category: string; // .cannabisComplianceType OR .cannabisType
  title: string; // .name
  desc: string; // .description
  brand: string;  //.brand.name
  strainType: Strain; //.cannabisStrain
  thc: string; // .description first line - may or may not be there
  weight: string; // .weight
  price: string; // .price
  image: string;  // either .image OR .images[0]
};
