import { Component, OnInit } from "@angular/core";
import { Concert } from "./core/interfaces/concert.interface";
import { ConcertService } from "./core/services/concert/concert.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "punto-ticket-prueba";
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.getConcerts();
  }

  getConcerts() {
    this.concertService.getAll().then((concerts) => {
      this.setConcerts(concerts);
    });
  }

  setConcerts(concerts: Concert[]) {
    this.concerts = concerts;
  }
}
