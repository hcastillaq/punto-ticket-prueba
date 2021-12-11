import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertService } from "src/app/core/services/concert/concert.service";

@Component({
  selector: "app-search-concert",
  templateUrl: "./search-concert.component.html",
  styleUrls: ["./search-concert.component.scss"],
})
export class SearchConcertComponent implements OnInit, OnDestroy {
  loading = false;
  isSearch = false;
  control = new FormControl("");
  destroySubs = new Subject();

  @Output("concerts") concerts: EventEmitter<Concert[]> = new EventEmitter();
  @Output("reset") reset: EventEmitter<never> = new EventEmitter<never>();

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.handleControlEmptyValue();
  }
  /**
   * call when user click in search button, get concerts from service
   * @returns void
   */
  search(): void {
    if (this.validateControlValue() && !this.isSearch) {
      this.isSearch = true;
      this.loading = true;
      this.concertService.getByArtist(this.control.value).then((concerts) => {
        this.loading = false;
        this.concerts.emit(concerts);
      });
    }
  }
  /**
   * emit reset and clear search state
   * @returns void
   */
  handleControlEmptyValue(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroySubs))
      .subscribe(() => {
        this.isSearch = false;
        if (!this.validateControlValue()) {
          this.reset.emit();
        }
      });
  }
  /**
   * reset search control
   * @returns void
   */
  clearControl(): void {
    this.control.setValue("");
  }

  /**
   * Validate search control value, if empty, return false.
   * @returns boolean
   */
  validateControlValue(): boolean {
    return this.control.value.trim() !== "";
  }

  /**
   * destroy subscriptions
   * @returns void
   */
  ngOnDestroy(): void {
    this.destroySubs.next(false);
    this.destroySubs.complete();
  }
}
