import { injectable } from "inversify";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

@injectable()
export class SeleniumDriverService {
  private driver: ThenableWebDriver;

  constructor() {
    this.driver = this.buildDriver();
  }

  public buildDriver() {
    if (!this.driver) {
      this.driver = new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(new firefox.Options().headless())
        .build();
    }

    return this.driver;
  }
}
