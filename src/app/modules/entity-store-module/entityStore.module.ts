import { NgModule } from "@angular/core";
import { EntityDataService } from "@ngrx/data";
import { ConcertDataService } from "src/app/ngrx/dataServices/concert.dataService";

@NgModule({
  providers: [ConcertDataService],
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    concertDataService: ConcertDataService
  ) {
    entityDataService.registerService("Concert", concertDataService);
  }
}
