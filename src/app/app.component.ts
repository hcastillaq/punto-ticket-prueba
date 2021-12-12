import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConcertFormComponent } from "./components/concert-form/concert-form.component";
import { Concert } from "./core/interfaces/concert.interface";
import { ConcertCollectionService } from "./ngrx/collections/concert.collection";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "punto-ticket-prueba";
  concerts: Concert[] = [];

  constructor(
    private concertService: ConcertCollectionService,
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
    this.concertService.getAll();
  }

  /**
   * set concerts from service in concerts
   * @returns void
   */
  restartConcerts(): void {
    this.getConcerts();
  }

  /**
   * open model with form
   * @param  {Concert} concert
   * @returns void
   */
  openDialog(concert: Concert): void {
    this.dialog.open(ConcertFormComponent, {
      width: "700px",
      data: concert,
    });
  }
}
