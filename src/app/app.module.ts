import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConcertRepository } from "./core/repositories/concert/concert.repository";
import { ConcertInMemoryRepository } from "./core/repositories/concert/concertInMemory.repository";
import { MaterialModule } from "./modules/material/material.module";
import { TableConcertsComponent } from "./components/table-concerts/table-concerts.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchConcertComponent } from "./components/search-concert/search-concert.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, TableConcertsComponent, SearchConcertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ConcertRepository, useClass: ConcertInMemoryRepository },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
