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
  /**
   * get concerts from service
   * @returns void
   */
  getConcerts(): void {
    this.concertService.getAll().then((concerts) => {
      this.setConcerts(concerts);
      this.setOldConcerts(concerts);
    });
  }

  /**
   * set concerts from service in concerts
   * @returns void
   */
  restartConcerts(): void {
    this.concerts = this.oldConcerts;
  }
  /**
   * set concerts in oldConcerts
   * @param  {Concert[]} concerts
   * @returns void
   */
  setOldConcerts(concerts: Concert[]): void {
    this.oldConcerts = concerts;
  }

  /**
   * set data in concerts
   * @param  {Concert[]} concerts
   * @returns void
   */
  setConcerts(concerts: Concert[]): void {
    this.concerts = concerts;
  }
}
