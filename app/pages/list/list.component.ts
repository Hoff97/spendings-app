import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending'
import { FilterService } from "../../shared/filter.service";

import { TextField } from "ui/text-field";

import { Router } from "@angular/router";

import * as dialogs from "ui/dialogs";

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
  pageSize = 20;
  searchField = "";
  hasNext: boolean;
  totalText = "";

  from = new Date();
  to = new Date();

  constructor(private spendingService: SpendingService, private router: Router,
              private filterService: FilterService) {}

  ngOnInit() {
    this.from = this.filterService.from;
    this.to = this.filterService.to;

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
    this.router.navigate(["/filter"]);
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
    this.spendingService.editing = spend.clone();
    this.router.navigate(["/edit"]);
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
