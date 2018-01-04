import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { FilterService } from "../../shared/filter.service";

import { TextField } from "ui/text-field";

import { Router } from "@angular/router";

import * as dialogs from "ui/dialogs";

import { PageRoute } from "nativescript-angular/router";

@Component({
  selector: "filter",
  moduleId: module.id,
  templateUrl: "./filter.html",
  styleUrls: ["./filter-common.css"],
  providers: []
})
export class FilterComponent implements OnInit {
  from = new Date();
  to = new Date();

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit() {
    this.from = this.filterService.from;
    this.to = this.filterService.to;
  }

  submit() {
    this.filterService.from = this.from;
    this.filterService.to = this.to;

    this.router.navigate(["/list"]);
  }
}
