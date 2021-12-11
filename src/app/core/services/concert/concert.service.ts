import { Injectable } from "@angular/core";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "../../repositories/concert/concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertService {
  constructor(private repository: ConcertRepository) {}
  /**
   * get all concerts
   * @returns Promise
   */
  getAll(): Promise<Concert[]> {
    return this.repository.all();
  }
  /**
   * get concerts filtered by artist
   * @param  {string} artist
   * @returns Promise
   */
  getByArtist(artist: string): Promise<Concert[]> {
    return this.repository.searchByArtist(artist);
  }
}
