import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { delay, Subject, takeUntil } from "rxjs";
import { ConcertCollectionService } from "src/app/ngrx/collections/concert.collection";

@Component({
  selector: "app-search-concert",
  templateUrl: "./search-concert.component.html",
  styleUrls: ["./search-concert.component.scss"],
})
export class SearchConcertComponent implements OnInit, OnDestroy {
  loading = this.concertService.loading$;
  isSearch = false;
  control = new FormControl("");
  destroySubs = new Subject();

  constructor(private concertService: ConcertCollectionService) {}

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
      this.concertService
        .getWithQuery(this.control.value)
        .subscribe((concerts) => {
          this.concertService.clearCache();
          this.concertService.addManyToCache(concerts);
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
          this.concertService.getAll();
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
