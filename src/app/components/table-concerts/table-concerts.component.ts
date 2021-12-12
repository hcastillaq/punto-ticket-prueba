import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertCollectionService } from "src/app/ngrx/collections/concert.collection";

@Component({
  selector: "app-table-concerts",
  templateUrl: "./table-concerts.component.html",
  styleUrls: ["./table-concerts.component.scss"],
  inputs: ["concerts"],
})
export class TableConcertsComponent implements OnInit {
  concerts: Concert[] = [];
  @Output() select: EventEmitter<Concert> = new EventEmitter<Concert>();

  displayedColumns = ["title", "artist", "date"];
  constructor(private concertsCollection: ConcertCollectionService) {}

  ngOnInit(): void {
    this.concertsCollection.entities$.subscribe(
      (concerts) => (this.concerts = concerts)
    );
    this.validateInputConcerts();
  }

  private validateInputConcerts() {}

  public selected(concert: Concert) {
    this.select.emit(concert);
  }
}
