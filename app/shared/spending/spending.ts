import { Category } from '../category/category';

export class Spending {
  constructor(public id: number, public amount: number, public category: Category,
              public description: string, public date: string) {}


  public clone() {
    return new Spending(this.id,this.amount, new Category(this.category.id, this.category.name, this.category.parent),
                        this.description, this.date);
  }
}
