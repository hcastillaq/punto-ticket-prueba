import { Injectable } from "@angular/core";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "./concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertInMemoryRepository extends ConcertRepository {
  private concerts: Concert[] = [
    {
      title: "concert 1",
      artist: "Artist 1",
      date: "2021/12/20",
      city: "Bogota",
      description: "Artist 1 concert",
      hour: "7:00 PM",
    },
    {
      title: "concert 2",
      artist: "Artist 2",
      date: "2021/12/20",
      city: "Medellin",
      description: "Artist 2 concert",
      hour: "7:00 PM",
    },
    {
      title: "concert 3",
      artist: "Artist 3",
      date: "2021/12/20",
      city: "Bucaramanga",
      description: "artist3 concert",
      hour: "7:00 PM",
    },
  ];

  all(): Promise<Concert[]> {
    return new Promise((resolve) => {
      resolve(this.concerts);
    });
  }

  searchByArtist(artist: string): Promise<Concert[]> {
    return new Promise((resolve) => {
      const foundConcerts = this.concerts.filter((concert) =>
        concert.artist.toLowerCase().includes(artist.toLowerCase())
      );
      resolve(foundConcerts);
    });
  }
}
