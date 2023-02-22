export interface FormObject {
  plates: MaterialType;
  papper: MaterialPapperType;
  machine: MaterialType;
  handwork?: number;
  gain_percentage: number;
}

interface MaterialType {
  id: string;
  quantity: number;
}

interface MaterialPapperType {
  id: string;
  size: string;
  quantity: number;
}
