import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { map, Observable } from "rxjs";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertService } from "src/app/core/services/concert/concert.service";

@Injectable({
  providedIn: "root",
})
export class ConcertDataService extends DefaultDataService<Concert> {
  constructor(
    private service: ConcertService,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super("Concert", http, httpUrlGenerator);
  }

  override getAll(): Observable<Concert[]> {
    return this.service.getAll();
  }

  override getWithQuery(queryParams: string): Observable<Concert[]> {
    return this.service.getByArtist(queryParams);
  }

  override delete(key: string): Observable<string | number> {
    return this.service.delete(key);
  }

  override update(update: Update<Concert>): Observable<Concert> {
    const concert = update.changes as Concert;
    return this.service.update(concert).pipe(map(() => concert));
  }
}
