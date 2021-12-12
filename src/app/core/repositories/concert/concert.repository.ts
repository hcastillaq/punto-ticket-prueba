import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Concert } from "../../interfaces/concert.interface";

@Injectable({
  providedIn: "root",
})
export abstract class ConcertRepository {
  abstract all(): Observable<Concert[]>;
  abstract searchByArtist(artist: string): Observable<Concert[]>;
  abstract update(concert: Concert): Observable<string>;
  abstract delete(id: string): Observable<string>;
}
