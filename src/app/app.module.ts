import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConcertRepository } from "./core/repositories/concert/concert.repository";
import { ConcertInMemoryRepository } from "./core/repositories/concert/concertInMemory.repository";
import { MaterialModule } from "./modules/material/material.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [
    { provide: ConcertRepository, useFactory: ConcertInMemoryRepository },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
