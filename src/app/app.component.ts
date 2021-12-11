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
  oldConcerts: Concert[] = [];
  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.getConcerts();
  }

  getConcerts() {
    this.concertService.getAll().then((concerts) => {
      this.setConcerts(concerts);
      this.setOldConcerts(concerts);
    });
  }

  restartConcerts() {
    this.concerts = this.oldConcerts;
  }

  setOldConcerts(concerts: Concert[]) {
    this.oldConcerts = concerts;
  }

  setConcerts(concerts: Concert[]) {
    this.concerts = concerts;
  }
}
