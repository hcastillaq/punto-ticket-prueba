import { Injectable } from "@angular/core";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "../../repositories/concert/concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertService {
  constructor(private repository: ConcertRepository) {}

  getAll(): Promise<Concert[]> {
    return this.repository.all();
  }

  getByArtist(artist: string): Promise<Concert[]> {
    return this.repository.searchByArtist(artist);
  }
}
