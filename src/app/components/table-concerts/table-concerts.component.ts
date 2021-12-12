import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Concert } from "src/app/core/interfaces/concert.interface";

@Component({
  selector: "app-table-concerts",
  templateUrl: "./table-concerts.component.html",
  styleUrls: ["./table-concerts.component.scss"],
  inputs: ["concerts"],
})
export class TableConcertsComponent implements OnInit {
  @Input() concerts: Concert[] = [];
  @Output() select: EventEmitter<Concert> = new EventEmitter<Concert>();

  displayedColumns = ["title", "artist", "date"];
  constructor() {}

  ngOnInit(): void {
    this.validateInputConcerts();
  }

  private validateInputConcerts() {}

  public selected(concert: Concert) {
    this.select.emit(concert);
  }
}
