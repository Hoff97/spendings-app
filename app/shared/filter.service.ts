import { Injectable } from "@angular/core";

import { Spending } from './spending/spending';

@Injectable()
export class FilterService {
  from: Date;
  to: Date;

  edit: Spending;

  constructor() {
    this.from = new Date();
    this.to = new Date();

    this.from.setDate(1);
    this.from.setMinutes(1);
    this.from.setHours(1);
  }
}
