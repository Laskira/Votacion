import { NgModule } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {
  MatPaginatorModule,
  MatPaginatorIntl
} from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { getDutchPaginatorIntl } from "./paginator-es";

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTableModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getDutchPaginatorIntl()
    }
  ]
})
export class MaterialModule {}
