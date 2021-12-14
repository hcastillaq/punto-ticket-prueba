import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertCollectionService } from "src/app/ngrx/collections/concert.collection";
import { DateService } from "src/app/core/services/date/date.service";

@Component({
  selector: "app-table-concerts",
  templateUrl: "./table-concerts.component.html",
  styleUrls: ["./table-concerts.component.scss"],
  inputs: ["concerts"],
})
export class TableConcertsComponent implements OnInit {
  loading = this.concertsCollection.loading$;
  dataSource: MatTableDataSource<Concert> = new MatTableDataSource();
  @Output() select: EventEmitter<Concert> = new EventEmitter<Concert>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns = ["nombre", "comuna", "recinto", "fecha", "agotado"];
  constructor(
    private concertsCollection: ConcertCollectionService,
    public dataService: DateService
  ) {}

  ngOnInit(): void {
    this.concertsCollection.entities$.subscribe((concerts) => {
      this.dataSource.data = concerts;
    });
    this.validateInputConcerts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private validateInputConcerts() {}

  public selected(concert: Concert) {
    this.select.emit(concert);
  }
}
