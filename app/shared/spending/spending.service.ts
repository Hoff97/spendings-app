import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Spending } from "./spending";
import { Category } from "../category/category";

import * as moment from 'moment';

@Injectable()
export class SpendingService {
  editing: Spending;

  constructor(private http: Http) {}

  query(search: string, sort: string, fro: Date, to: Date, page: number, pageSize: number) {
    let headers = new Headers();
    headers.append("x-auth-token", Config.token);
    headers.append("Content-Type", "application/json");
    headers.append("x-page", page + "");
    headers.append("x-page-size", pageSize + "");

    let url = "api/spending?sortDir=true&sort=" + sort
      + "&from=" + moment(fro).format("YYYY-MM-DD")
      + "&to=" + moment(to).format("YYYY-MM-DD")
      + "&search=" + search;

    return this.http.get(Config.apiUrl + url, {
      headers: headers
    })
      .map(res => {return {total: res.headers.get("x-number-items"), result: res.json()};})
    .map(data => {
      let spendingList = [];
      data.result.forEach((spending) => {
        spendingList.push(new Spending(spending.id, spending.amount,
                                       new Category(spending.category.id,spending.category.name,spending.category.parent),
                                       spending.description, spending.date));
      });
      return {total: data.total, spendings: spendingList};
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
