import { Injectable } from "@angular/core";
import * as day from "dayjs";

@Injectable({
  providedIn: "root",
})
export class DateService {
  private format = "YYYY-MM-DDTHH:mm";
  /**
   * convert unix date to string date with format YYYY-MM-DDTHH:mm
   * @param  {number} unix
   * @returns string
   */
  unixToString(unix: number): string {
    unix = Number(unix);
    return day.unix(unix).format(this.format);
  }
  /**
   * convert string date with format YYYY-MM-DDTHH:mm to unix date
   * @param  {string} date
   * @returns number
   */
  stringToUnixString(date: string): string {
    return String(day(date).toDate().getTime() / 1000);
  }
}
