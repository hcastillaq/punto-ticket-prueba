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
import { ConcertFormComponent } from "./components/concert-form/concert-form.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule } from "@ngrx/data";
import { entityConfig } from "./entity-metadata";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { EntityStoreModule } from "./modules/entity-store-module/entityStore.module";

@NgModule({
  declarations: [
    AppComponent,
    TableConcertsComponent,
    SearchConcertComponent,
    ConcertFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EntityStoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: ConcertRepository, useClass: ConcertInMemoryRepository },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConcertFormComponent],
})
export class AppModule {}
