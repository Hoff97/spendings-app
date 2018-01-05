import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending';
import { Category } from '../../shared/category/category';
import { FilterService } from "../../shared/filter.service";

import { Router } from "@angular/router";

import { DatePicker } from "ui/date-picker";

import { Page } from "ui/page";

import * as moment from 'moment';

import * as dialogs from "ui/dialogs";

@Component({
  selector: "detail",
  moduleId: module.id,
  templateUrl: "./detail.html",
  styleUrls: ["./detail-common.css"],
  providers: [SpendingService]
})
export class DetailComponent implements OnInit {
  spending: Spending;
  
  constructor(private spendingService: SpendingService, private router: Router,
              private filterService: FilterService) {
    this.spending = filterService.edit;
  }

  ngOnInit() {
  }

  submit() {
    this.router.navigate(["/edit"]);
  }

  delete(){
    dialogs.confirm("Do you really want to delete this spending?").then(result => {
      if(result) {
        this.spendingService.delete(this.spending)
          .subscribe(y => {
            this.router.navigate(["/list"]);
          });
      }
    });
  }
}
