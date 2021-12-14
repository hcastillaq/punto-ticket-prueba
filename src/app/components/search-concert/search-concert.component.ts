import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
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

  ngOnInit(): void {}
  /**
   * call when user click in search button, get concerts from service
   * @returns void
   */
  search(): void {
    if (this.validateControlValue() && !this.isSearch) {
      this.isSearch = true;
      this.concertService
        .getWithQuery(this.control.value)
        .pipe(takeUntil(this.destroySubs))
        .subscribe((concerts) => {
          this.concertService.clearCache();
          this.concertService.addAllToCache(concerts);
        });
    }
  }

  /**
   * reset search control
   * @returns void
   */
  clearControl(): void {
    this.isSearch = false;
    this.control.setValue("");
    this.concertService.clearCache();
    this.concertService.getAll();
  }

  /**
   * Validate search control value, if empty, return false.
   * @returns boolean
   */
  validateControlValue(): boolean {
    return this.control.value.trim().length;
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
