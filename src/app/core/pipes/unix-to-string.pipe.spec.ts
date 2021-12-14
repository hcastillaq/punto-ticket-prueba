import { DateService } from "../services/date/date.service";
import { UnixToStringPipe } from "./unix-to-string.pipe";

describe("UnixToStringPipe", () => {
  it("create an instance", () => {
    const pipe = new UnixToStringPipe(new DateService());
    expect(pipe).toBeTruthy();
  });
});
