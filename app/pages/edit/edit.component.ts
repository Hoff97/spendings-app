import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending';
import { Category } from '../../shared/category/category';
import { FilterService } from "../../shared/filter.service";

import { Router } from "@angular/router";

import { DatePicker } from "ui/date-picker";

import { Page } from "ui/page";

import * as moment from 'moment';

@Component({
  selector: "edit",
  moduleId: module.id,
  templateUrl: "./edit.html",
  styleUrls: ["./edit-common.css"],
  providers: [SpendingService]
})
export class EditComponent implements OnInit {
  spending: Spending;
  date: Date;
  categories: Array<Category>;

  constructor(private spendingService: SpendingService, private router: Router,
              private filterService: FilterService) {
    this.spending = filterService.edit;
    this.date = new Date(this.spending.date);

    this.spendingService.getCategories()
      .subscribe(cat => {this.categories = cat;});
  }

  ngOnInit() {
  }

  submit() {
    let dateS = this.date.getFullYear()
      + "-" + (this.date.getMonth()+1 < 10 ? "0" : "") + (this.date.getMonth()+1)
      + "-" + (this.date.getDay() < 10 ? "0" : "") + this.date.getDay();
    let catI = -1;
    for(var cat of this.categories) {
      if(cat.name == this.spending.category.name)
        catI = cat.id;
    }
    if(catI == -1) {
      this.spendingService.addCategory(this.spending.category.name)
        .subscribe(c => {
          catI = c.id
          this.spendingService.add(dateS,catI,this.spending.amount,this.spending.description)
            .subscribe(spend => {
              this.router.navigate(["/list"]);
            });
        });
    } else {
      this.spendingService.edit(this.spending.id,dateS,catI,this.spending.amount,this.spending.description)
        .subscribe(spend => {

        this.router.navigate(["/list"]);
      });
    }
  }
}
