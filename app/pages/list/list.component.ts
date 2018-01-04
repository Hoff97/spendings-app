import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending'

import { TextField } from "ui/text-field";

import { Router } from "@angular/router";

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
  searchField = "";

  constructor(private spendingService: SpendingService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.spendingService.load()
      .subscribe(loadedGroceries => {
        loadedGroceries.forEach((groceryObject) => {
          this.spendingList.unshift(groceryObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  search() {
    if (this.searchField.trim() === "") {
      alert("Enter a non empty search");
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.searchTextField.nativeElement;
    textField.dismissSoftInput();
    //TODO
  }

  filter() {
    //TODO
  }

  del(spend: Spending) {
    //TODO
  }

  edit(spend: Spending) {
    //TODO
  }

  add() {
    this.router.navigate(["/add"])
  }
}
