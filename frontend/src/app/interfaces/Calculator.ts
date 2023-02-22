export interface MaterialStructured {
  subtype: string;
  materials: Material[];
}

export interface Material {
  product_id: string;
  label: string;
  name: string;
}

export interface Size {
  name: string;
  divider: number;
}
