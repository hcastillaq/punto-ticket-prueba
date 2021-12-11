import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Concert } from "src/app/core/interfaces/concert.interface";

@Component({
  selector: "app-table-concerts",
  templateUrl: "./table-concerts.component.html",
  styleUrls: ["./table-concerts.component.scss"],
  inputs: ["concerts"],
})
export class TableConcertsComponent implements OnInit {
  @Input() concerts: Concert[] = [];
  dataSource: MatTableDataSource<Concert> = new MatTableDataSource(
    this.concerts
  );
  displayedColumns = ["title", "artist", "date", "hour"];
  constructor() {}

  ngOnInit(): void {
    this.validateInputConcerts();
  }

  private validateInputConcerts() {}
}
