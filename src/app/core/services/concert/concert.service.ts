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

  /**
   * update concert
   * @param  {Concert} concert
   * @returns void
   */
  update(concert: Concert): void {
    this.repository.update(concert);
  }

  /**
   * delete concert
   * @param  {string} concert
   * @returns void
   */
  delete(id: string): void {
    this.repository.delete(id);
  }
}
