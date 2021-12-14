import { Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "../../repositories/concert/concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertService {
  constructor(private repository: ConcertRepository) {}
  /**
   * get all concerts
   * @returns Observable
   */
  getAll(): Observable<Concert[]> {
    return this.repository.all();
  }
  /**
   * get concerts filtered by artist
   * @param  {string} artist
   * @returns Observable
   */
  getByArtist(artist: string): Observable<Concert[]> {
    return this.repository.searchByArtist(artist);
  }

  /**
   * update concert
   * @param  {Concert} concert
   * @returns Observable
   */
  update(concert: Concert): Observable<Concert> {
    return this.repository.update(concert);
  }

  /**
   * delete concert
   * @param  {string} concert
   * @returns Observable
   */
  delete(id: string): Observable<string> {
    return this.repository.delete(id);
  }
}
