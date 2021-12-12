import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertService } from "src/app/core/services/concert/concert.service";
import { ConcertCollectionService } from "src/app/ngrx/collections/concert.collection";

export type ConcertFormAction = "show" | "edit" | "create" | "delete";
export type ConcertFormResponse = {
  action: ConcertFormAction;
  concert: Concert;
};

@Component({
  selector: "app-concert-form",
  templateUrl: "./concert-form.component.html",
  styleUrls: ["./concert-form.component.scss"],
})
export class ConcertFormComponent implements OnInit {
  action: ConcertFormAction = "show";
  readonly = false;
  loading = this.service.loading$;
  form: FormGroup = this.buildForm();

  constructor(
    private service: ConcertCollectionService,
    private formBuilder: FormBuilder,
    private ref: MatDialogRef<ConcertFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Concert
  ) {}

  ngOnInit(): void {
    this.changeReadonly();
  }

  /**
   * build concert form
   * @returns FormGroup
   */
  buildForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      artist: [this.data.artist, [Validators.required]],
      date: [this.data.date, [Validators.required]],
      city: [this.data.city, [Validators.required]],
    });
  }

  /**
   * change readonly according to form action
   * @returns
   */
  changeReadonly(): void {
    this.readonly = this.action === "show";
  }

  /**
   * change action form when user change checkbox edit value
   * @param  {boolean} value
   */
  toggleActionEdit(value: boolean) {
    this.action = value ? "edit" : "show";
    this.changeReadonly();
  }

  /**
   * runs when user click in action button, call one function according to form action
   * @returns void
   */
  finish(): void {
    switch (this.action) {
      case "edit":
        this.edit();
        break;
      case "delete":
        this.delete();
        break;
      default:
        this.close();
        break;
    }
  }

  /**
   * call update from service and close
   * @returns void
   */
  edit(): void {
    this.service.update({ ...this.data, ...this.form.value }).subscribe(() => {
      this.close();
    });
  }

  /**
   * calls delete from service and close
   * @returns void
   */
  delete(): void {
    this.service.delete(this.data.id).subscribe(() => {
      this.close();
    });
  }

  /**
   * runs when user click in delete icon button
   * @returns void
   */
  clickDelete(): void {
    this.action = "delete";
    this.finish();
  }

  /**
   * close modal and emit data
   * @returns void
   */
  close(): void {
    this.ref.close();
  }
}
