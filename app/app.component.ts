import { Component } from "@angular/core";

import { FilterService } from './shared/filter.service';

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>",
  providers: [FilterService]
})
export class AppComponent {}
