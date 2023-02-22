export interface Product {
  product_id?: string;
  name: string;
  price: number;
  product_type: string;
  subtype: string;
  label: string;
  image_url?: string;
}

export enum ProductOptions {
  Material = 'material',
  Merch = 'mercancia',
}
