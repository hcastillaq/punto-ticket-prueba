import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Concert } from "../../interfaces/concert.interface";
import { ConcertRepository } from "./concert.repository";

@Injectable({
  providedIn: "root",
})
export class ConcertInMemoryRepository extends ConcertRepository {
  private concerts: Concert[] = [
    {
      id: "1",
      title: "concert 1",
      artist: "Artist 1",
      date: "2021-12-20T00:00",
      city: "Bogota",
      description: "Artist 1 concert",
    },
    {
      id: "2",
      title: "concert 2",
      artist: "Artist 2",
      date: "2021-12-20T00:00",
      city: "Medellin",
      description: "Artist 2 concert",
    },
    {
      id: "3",
      title: "concert 3",
      artist: "Artist 3",
      date: "2021-12-20T00:00",
      city: "Bucaramanga",
      description: "artist3 concert",
    },
  ];

  all(): Observable<Concert[]> {
    return of(this.concerts);
  }

  searchByArtist(artist: string): Observable<Concert[]> {
    const foundConcerts = this.concerts.filter((concert) =>
      concert.artist.toLowerCase().includes(artist.toLowerCase())
    );
    return of(foundConcerts);
  }

  update(concert: Concert): Observable<string> {
    this.concerts = this.concerts.map((_concert) => {
      if (_concert.id === concert.id) {
        return concert;
      }
      return _concert;
    });
    return of(concert.id);
  }

  delete(id: string): Observable<string> {
    this.concerts = this.concerts.filter((concert) => concert.id !== id);
    return of(id);
  }
}
