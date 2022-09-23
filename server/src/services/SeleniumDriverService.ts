import { SELENIUM_CONTAINER_PORT, SELENIUM_HOST } from "@/config";
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
        .usingServer(
          `http://${SELENIUM_HOST!}:${SELENIUM_CONTAINER_PORT}/wd/hub`,
        )
        .setFirefoxOptions(
          new firefox.Options()
            .windowSize({
              width: 640,
              height: 480,
            })
            .headless(),
        )
        .build();
    }

    return this.driver;
  }
}
