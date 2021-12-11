import { Injectable } from "@angular/core";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "./concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertInMemoryRepository extends ConcertRepository {
  private concerts: Concert[] = [];

  all(): Promise<Concert[]> {
    return new Promise((resolve) => {
      resolve(this.concerts);
    });
  }
}
