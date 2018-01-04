import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Spending } from "./spending";
import { Category } from "../category/category";

@Injectable()
export class SpendingService {
  constructor(private http: Http) {}

  load() {
    let headers = new Headers();
    headers.append("x-auth-token", Config.token);
    headers.append("Content-Type", "application/json");

    return this.http.get(Config.apiUrl + "api/spending?sortDir=true", {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let spendingList = [];
      data.forEach((spending) => {
        spendingList.push(new Spending(spending.id, spending.amount,
                                       new Category(spending.category.id,spending.category.name,spending.category.parent),
                                       spending.description, spending.date));
      });
      return spendingList;
    })
    .catch(this.handleErrors);
  }

  query(search: string, sort: string, from: string, to: string) {
    let headers = new Headers();
    headers.append("x-auth-token", Config.token);
    headers.append("Content-Type", "application/json");

    return this.http.get(Config.apiUrl + "api/spending?sortDir=true", {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let spendingList = [];
      data.forEach((spending) => {
        spendingList.push(new Spending(spending.id, spending.amount,
                                       new Category(spending.category.id,spending.category.name,spending.category.parent),
                                       spending.description, spending.date));
      });
      return spendingList;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.toString()));
    return Observable.throw(error);
  }

  add(name: string) {
    //TODO
  }
}
