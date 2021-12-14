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
      id: "6",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "16",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "26",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "36",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "46",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "56",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "66",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "76",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "86",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
    {
      id: "96",
      nombre: "Louis Tomlinson - World Tour",
      imagen: "https://static.puntoticket.com/images/eventos/dgm094v6_md.jpg",
      fecha: "1644350400",
      recinto: "Movistar Arena",
      comuna: "Santiago",
      precio: {
        monto: 73000,
        moneda: "CLP",
      },
      artistas: ["Louis Tomlinson"],
      agotado: true,
    },
  ];

  all(): Observable<Concert[]> {
    return of(this.concerts);
  }

  searchByArtist(artist: string): Observable<Concert[]> {
    const foundConcerts = this.concerts.filter((concert) =>
      concert.artistas.toString().toLowerCase().includes(artist.toLowerCase())
    );
    return of(foundConcerts);
  }

  update(concert: Concert): Observable<Concert> {
    this.concerts = this.concerts.map((_concert) => {
      if (_concert.id === concert.id) {
        return concert;
      }
      return _concert;
    });
    return of(concert);
  }

  delete(id: string): Observable<string> {
    this.concerts = this.concerts.filter((concert) => concert.id !== id);
    return of(id);
  }
}
