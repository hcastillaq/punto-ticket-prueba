import { Pipe, PipeTransform } from "@angular/core";
import { DateService } from "../services/date/date.service";

@Pipe({
  name: "unixToString",
})
export class UnixToStringPipe implements PipeTransform {
  constructor(private dateService: DateService) {}

  transform(value: number, ...args: unknown[]): string {
    const [date, time] = this.dateService.unixToString(value).split("T");
    return `${date} / ${time}`;
  }
}
