import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending'

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
  searchField = "";

  constructor(private spendingService: SpendingService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  search() {
    // Dismiss the keyboard
    let textField = <TextField>this.searchTextField.nativeElement;
    textField.dismissSoftInput();
    //TODO
  }

  filter() {
    //TODO
  }

  load() {
    this.spendingList = [];
    this.isLoading = true;
    this.listLoaded = false;
    this.spendingService.load()
      .subscribe(loadedSpendings => {
        loadedSpendings.forEach((spend) => {
          this.spendingList.unshift(spend);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  del(spend: Spending) {
    dialogs.confirm("Do you really want to delete the spending " + JSON.stringify(spend)).then(result => {
      if(result) {
        this.spendingService.delete(spend)
          .subscribe(y => {
            this.load();
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
}
