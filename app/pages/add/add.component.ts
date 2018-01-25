import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { SpendingService } from "../../shared/spending/spending.service";
import { Spending } from '../../shared/spending/spending';
import { Category } from '../../shared/category/category';

import { Router } from "@angular/router";

import { DatePicker } from "ui/date-picker";

import { Page } from "ui/page";

import * as camera from "nativescript-camera";
import * as imagepicker from "nativescript-imagepicker";

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
  categories: Array<Category>;
  test = ["A", "Hallo", "Jo"];

  private autocmp;

  constructor(private spendingService: SpendingService, private router: Router) {
    this.spending = new Spending(0, 0, new Category(0, "", 0),
      "", "");
    this.date = new Date();

    this.spendingService.getCategories()
      .subscribe(cat => { this.categories = cat; console.log(JSON.stringify(cat)); });
  }

  ngOnInit() {
  }

  submit() {
    let catI = -1;
    for (var cat of this.categories) {
      if (cat.name == this.spending.category.name)
        catI = cat.id;
    }
    if (catI == -1) {
      this.spendingService.addCategory(this.spending.category.name)
        .subscribe(c => {
          catI = c.id
          this.spendingService.add(this.date, catI, this.spending.amount, this.spending.description)
            .subscribe(spend => {
              this.router.navigate(["/list"]);
            });
        });
    } else {
      this.spendingService.add(this.date, catI, this.spending.amount, this.spending.description)
        .subscribe(spend => {
          this.router.navigate(["/list"]);
        });
    }
  }

  scan() {
    if (camera.isAvailable()) {
      camera.requestPermissions();
      camera.takePicture()
        .then((imageAsset) => {
          console.log("Result is an image asset instance");

        }).catch((err) => {
          console.log("Error -> " + err.message);
        });
    } else {
      let context = imagepicker.create({
        mode: "single" // use "multiple" for multiple selection
      });
      context
        .authorize()
        .then(() => context.present())
        .then(selection => {
          console.log(selection);
        }).catch(e => {
          // process error

        });
    }
  }

  pickImage() {
    let context = imagepicker.create({
      mode: "single" // use "multiple" for multiple selection

    });
    context
      .authorize()
      .then(() => context.present())
      .then(selection => {
        console.log("yay");
        for (let sel of selection) {
          this.spendingService.scanRecipe(sel);

        }
      }).catch(e => {
        // process error
      });
  }

  logEvent(e) {
    console.log(e.eventName);
  }
}
