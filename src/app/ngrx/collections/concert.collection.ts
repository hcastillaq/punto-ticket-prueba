import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Concert } from "src/app/core/interfaces/concert.interface";

@Injectable({ providedIn: "root" })
export class ConcertCollectionService extends EntityCollectionServiceBase<Concert> {
  constructor(
    entityCollectionServiceElementFactory: EntityCollectionServiceElementsFactory
  ) {
    super("Concert", entityCollectionServiceElementFactory);
  }
}
