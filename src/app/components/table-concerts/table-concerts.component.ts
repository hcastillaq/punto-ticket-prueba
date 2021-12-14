import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertCollectionService } from "src/app/ngrx/collections/concert.collection";
import { DateService } from "src/app/core/services/date/date.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-table-concerts",
  templateUrl: "./table-concerts.component.html",
  styleUrls: ["./table-concerts.component.scss"],
  inputs: ["concerts"],
})
export class TableConcertsComponent implements OnInit, OnDestroy {
  loading = this.concertsCollection.loading$;
  dataSource: MatTableDataSource<Concert> = new MatTableDataSource();
  @Output() select: EventEmitter<Concert> = new EventEmitter<Concert>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  destroySubs = new Subject();
  displayedColumns = ["nombre", "comuna", "recinto", "fecha", "agotado"];

  constructor(
    private concertsCollection: ConcertCollectionService,
    public dataService: DateService
  ) {}

  ngOnInit(): void {
    this.subscribeAndSetConcertsInDataSource();
  }

  ngOnDestroy(): void {
    this.destroySubs.next(false);
    this.destroySubs.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * subscribe concerts and set in dataSource
   * @returns void
   */
  subscribeAndSetConcertsInDataSource(): void {
    this.concertsCollection.entities$
      .pipe(takeUntil(this.destroySubs))
      .subscribe((concerts) => {
        this.dataSource.data = concerts;
      });
  }
  /**
   * runs when user click in a row, emit the selected row
   * @param  {Concert} concert
   */
  public selected(concert: Concert) {
    this.select.emit(concert);
  }
}
