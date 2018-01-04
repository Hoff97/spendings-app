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

  query(search: string, sort: string, fro: string, to: string, page: number) {
    let headers = new Headers();
    headers.append("x-auth-token", Config.token);
    headers.append("Content-Type", "application/json");
    headers.append("x-page", page + "");

    let url = "api/spending?sortDir=true&sort=" + sort
      + "&from=" + fro
      + "&to=" + to
      + "&search=" + search;

    return this.http.get(Config.apiUrl + url, {
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

  add(date: string, categoryId: number, amount: number, description: string) {
     let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-auth-token", Config.token);

    return this.http.post(
      Config.apiUrl + "api/spending",
      JSON.stringify({
        date: date,
        categoryFk: categoryId,
        description: description,
        amount: amount,
        userFk: 0
      }),
      { headers: headers }
    )
      .map(response => response.json())
      .do(data => {
        console.log(data);
      })
        .catch(this.handleErrors);
  }

  delete(spending: Spending) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-auth-token", Config.token);

    return this.http.delete(
      Config.apiUrl + "api/spending/" + spending.id,
      { headers: headers }
    )
      .map(response => response.json())
      .do(data => {
        console.log(data);
      })
        .catch(this.handleErrors);
  }

  addCategory(name: string) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-auth-token", Config.token);

    return this.http.post(
      Config.apiUrl + "api/category",
      JSON.stringify({
        name: name,
        parent: 0
      }),
      { headers: headers }
    )
      .map(response => response.json())
      .do(data => {
        console.log(data);
      })
        .catch(this.handleErrors);
  }

  getCategories() {
    let headers = new Headers();
    headers.append("x-auth-token", Config.token);
    headers.append("Content-Type", "application/json");

    return this.http.get(Config.apiUrl + "api/category", {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let categoryList = [];
      data.forEach((category) => {
        categoryList.push(new Category(category.id,category.name,category.parent));
      });
      return categoryList;
    })
    .catch(this.handleErrors);
  }
}
