import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending'
import { FilterService } from "../../shared/filter.service";

import { TextField } from "ui/text-field";

import { Router } from "@angular/router";

import * as dialogs from "ui/dialogs";

import { Sum } from '../../shared/sum/sum';

import { ObservableArray } from "tns-core-modules/data/observable-array";

@Component({
  selector: "sum",
  moduleId: module.id,
  templateUrl: "./sum.html",
  styleUrls: ["./sum-common.css"],
  providers: [SpendingService]
})
export class SumComponent implements OnInit {
  isLoading = true;
  listLoaded = false;

  searchField = "";
  
  from = new Date();
  to = new Date();

  sumList: Array<Sum>;

  constructor(private spendingService: SpendingService, private router: Router,
              private filterService: FilterService) {}

  ngOnInit() {
    this.from = this.filterService.from;
    this.to = this.filterService.to;

    this.isLoading = true;
    this.listLoaded = false;
    this.search();
    this.sumList = [];
  }

  pageLoaded() {
    console.log("loaded");
  }

  search() {
    this.isLoading = true;
    this.listLoaded = false;

    this.spendingService.sum(this.from, this.to)
      .subscribe(res => {
        this.sumList = res;
        /*res.forEach((spend) => {
          this.sumList.unshift(spend);
        });*/

        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  filter() {
    this.router.navigate(["/filter"]);
  }
}
