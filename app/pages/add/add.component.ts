import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending';
import { Category } from '../../shared/category/category';

import { Router } from "@angular/router";

import { DatePicker } from "ui/date-picker";

@Component({
  selector: "add",
  moduleId: module.id,
  templateUrl: "./add.html",
  styleUrls: ["./add-common.css"],
  providers: [SpendingService]
})
export class AddComponent implements OnInit {
  spending: Spending;
  date: Date;

  constructor(private spendingService: SpendingService, private router: Router) {
    this.spending = new Spending(0,0,new Category(0,"",0),
                                 "","");
    this.date = new Date();
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.date);
  }
}
