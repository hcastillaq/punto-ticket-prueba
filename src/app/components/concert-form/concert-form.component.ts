import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Concert } from "src/app/core/interfaces/concert.interface";
import { ConcertCollectionService } from "src/app/ngrx/collections/concert.collection";
import { DateService } from "src/app/core/services/date/date.service";
import { ConfirmationComponent } from "../confirmation/confirmation.component";

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
    private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public data: Concert,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.changeReadonly();

    // set artist in form
    this.data.artistas.forEach((artista) => {
      this.getFormArrayArtists.push(this.createArtist(artista));
    });
  }
  /**
   * Get artists from form
   * @returns FormArray
   */
  get getFormArrayArtists(): FormArray {
    return <FormArray>this.form.get("artistas");
  }

  /**
   * build concert form
   * @returns FormGroup
   */
  buildForm(): FormGroup {
    return this.formBuilder.group({
      nombre: [this.data.nombre, [Validators.required]],
      imagen: [
        this.data.imagen,
        [
          Validators.required,
          Validators.pattern(
            "^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|png)$"
          ),
        ],
      ],
      artistas: this.formBuilder.array([], Validators.required),
      fecha: [
        this.dateService.unixToString(Number(this.data.fecha)),
        [Validators.required],
      ],
      comuna: [this.data.comuna, [Validators.required]],
      recinto: [this.data.recinto, [Validators.required]],
      agotado: [this.data.agotado, [Validators.required]],
      precio: this.formBuilder.group({
        moneda: [
          this.data.precio.moneda,
          [Validators.required, Validators.min(0)],
        ],
        monto: [this.data.precio.monto, [Validators.required]],
      }),
    });
  }

  /**
   * create formControl for artists array in form
   * @param  {string} artist
   * @returns FormGroup
   */
  createArtist(artist: string = ""): FormGroup {
    return this.formBuilder.group({
      artista: [artist, Validators.required],
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
   * convert form values to Concert values
   * @returns Concert
   */
  getParseFormData(): Concert {
    const values: Concert = this.form.value;
    values.fecha = this.dateService.stringToUnixString(String(values.fecha));
    values.artistas = this.getFormArrayArtists.value.map(
      (control: any) => control.artista
    );
    return values;
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
    this.service
      .update({ ...this.data, ...this.getParseFormData() })
      .subscribe(() => {
        this.close();
      });
  }

  /**
   * calls delete from service and close
   * @returns void
   */
  delete(): void {
    this.dialog
      .open(ConfirmationComponent)
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.service.delete(this.data.id).subscribe(() => {
            this.close();
          });
        }
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

  /**
   * add artist to form
   * @returns void
   */
  addArtist(): void {
    this.getFormArrayArtists.insert(0, this.createArtist());
  }
  /**
   * remove artist from form
   * @param  {number} index
   * @returns void
   */
  removeArtist(index: number): void {
    this.getFormArrayArtists.removeAt(index);
  }
}
