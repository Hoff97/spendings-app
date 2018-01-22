import { Category } from '../category/category';

export interface ScanResult {
  price: number[];
  category: Category[];
  description: string;
  date: string[];
}
