import { Injectable } from "@angular/core";

@Injectable()
export class FilterService {
  from: Date;
  to: Date;

  constructor() {
    this.from = new Date();
    this.to = new Date();

    this.from.setDate(1);
    this.from.setMinutes(1);
    this.from.setHours(1);
  }
}
