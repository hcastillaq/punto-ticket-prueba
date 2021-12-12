import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  ConcertFormComponent,
  ConcertFormResponse,
} from "./components/concert-form/concert-form.component";
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

  constructor(
    private concertService: ConcertService,
    private dialog: MatDialog
  ) {}

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
    });
  }

  /**
   * set concerts from service in concerts
   * @returns void
   */
  restartConcerts(): void {
    this.getConcerts();
  }

  /**
   * set data in concerts
   * @param  {Concert[]} concerts
   * @returns void
   */
  setConcerts(concerts: Concert[]): void {
    this.concerts = concerts;
  }
  /**
   * open model with form
   * @param  {Concert} concert
   * @returns void
   */
  openDialog(concert: Concert): void {
    this.dialog
      .open(ConcertFormComponent, {
        width: "700px",
        data: concert,
      })
      .afterClosed()
      .subscribe((resp: ConcertFormResponse) => {
        this.updateTable(resp);
      });
  }
  /**
   * update in memory concerts according concert form response
   * @param  {ConcertFormResponse} data
   * @returns void
   */
  updateTable(data: ConcertFormResponse): void {
    switch (data.action) {
      case "edit":
        this.updateConcert(data.concert);
        break;
      case "delete":
        this.deleteConcert(data.concert);
        break;
      default:
        break;
    }
  }
  /**
   * update in memory concert
   * @param  {Concert} concert
   * @returns void
   */
  updateConcert(concert: Concert): void {
    const concerts = this.concerts.map((_concert) => {
      if (_concert.id === concert.id) {
        return concert;
      }
      return _concert;
    });
    this.setConcerts(concerts);
  }

  /**
   * delete in memory concert
   * @param  {Concert} concert
   * @returns void
   */
  deleteConcert(concert: Concert): void {
    const concerts = this.concerts.filter(
      (_concert) => _concert.id !== concert.id
    );
    this.setConcerts(concerts);
  }
}
