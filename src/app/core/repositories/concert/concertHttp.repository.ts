import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, merge, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "./concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertHttpRepository extends ConcertRepository {
  private path = environment.api;

  constructor(private http: HttpClient) {
    super();
  }

  all(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.path);
  }

  searchByArtist(artist: string): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.path, {
      params: new HttpParams().set("artistas", artist),
    });
  }

  update(concert: Concert): Observable<Concert> {
    return this.http.put<Concert>(this.path + `/${concert.id}`, concert);
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(this.path + `/${id}`)
      .pipe(map((resp: any) => resp.id));
  }
}
