import { Injectable } from "@angular/core";
import { Concert } from "../../interfaces/concert.interface";

@Injectable({
  providedIn: "root",
})
export abstract class ConcertRepository {
  abstract all(): Promise<Concert[]>;
}
