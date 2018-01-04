import { Category } from '../category/category';

export class Spending {
  constructor(public id: number, public amount: number, public category: Category,
              public description: string, public date: string) {}
}
