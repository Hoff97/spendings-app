import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "api/signUp",
      JSON.stringify({
        firstName: user.email,
        lastName: "",
        email: user.email,
        password: user.password
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.toString()));
    return Observable.throw(error);
  }

  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "api/signIn",
      JSON.stringify({
        email: user.email,
        password: user.password,
        rememberMe: true
      }),
      { headers: headers }
    )
      .map(response => response.json())
      .do(data => {
        Config.token = data.token;
      })
        .catch(this.handleErrors);
  }
}
