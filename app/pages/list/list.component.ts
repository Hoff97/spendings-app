import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending'

import { TextField } from "ui/text-field";

import { Router } from "@angular/router";

import * as dialogs from "ui/dialogs";

import { PageRoute } from "nativescript-angular/router";

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"],
  providers: [SpendingService]
})
export class ListComponent implements OnInit {
  spendingList: Array<Spending> = [];

  isLoading = true;
  listLoaded = false;

  grocery = "";
  @ViewChild("search") searchTextField: ElementRef;

  page = 0;
  total = 0;
  pageSize = 5;
  searchField = "";
  hasNext: boolean;
  totalText = "";

  from = new Date();
  to = new Date();

  constructor(private spendingService: SpendingService, private router: Router, private pageRoute: PageRoute) {}

  ngOnInit() {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach((params) => {
        if(params["from"])
          this.from = params["from"];
        if(params["to"])
          this.to = params["to"];
      });

    this.from.setDate(0);
    this.from.setMinutes(0);
    this.from.setHours(0);

    this.isLoading = true;
    this.listLoaded = false;
    this.search();
  }

  search() {
    // Dismiss the keyboard
    /*let textField = <TextField>this.searchTextField.nativeElement;
    textField.dismissSoftInput();*/
    this.spendingList = [];
    this.isLoading = true;
    this.listLoaded = false;
    this.spendingService.query(this.searchField, "id", this.from, this.to, this.page, this.pageSize)
      .subscribe(res => {
        res.spendings.forEach((spend) => {
          this.spendingList.unshift(spend);
        });
        this.total = res.total;
        this.hasNext = this.total>this.pageSize*(this.page+1);

        let start = this.page*this.pageSize+1
        this.totalText = start + "-" + (start + this.spendingList.length - 1) + "/" + this.total;

        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  filter() {
    //TODO
  }

  del(spend: Spending) {
    dialogs.confirm("Do you really want to delete the spending " + JSON.stringify(spend)).then(result => {
      if(result) {
        this.spendingService.delete(spend)
          .subscribe(y => {
            this.search();
          });
      }
    });
  }

  edit(spend: Spending) {
    //TODO
  }

  add() {
    this.router.navigate(["/add"]);
  }

  prev() {
    if(this.page>0) {
      this.page--;
      this.search();
    }
  }

  next() {
    if(this.hasNext) {
      this.page++;
      this.search();
    }
  }
}
