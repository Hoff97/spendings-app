import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { AddComponent } from './pages/add/add.component';
import { FilterComponent } from './pages/filter/filter.component';
import { EditComponent } from './pages/edit/edit.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SumComponent } from './pages/sum/sum.component';

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent },
  { path: "filter", component: FilterComponent },
  { path: "edit", component: EditComponent },
  { path: "detail", component: DetailComponent },
  { path: "sum", component: SumComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  AddComponent,
  FilterComponent,
  EditComponent,
  DetailComponent,
  SumComponent
];
