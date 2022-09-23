import { DEPENDENCY_TYPES } from "@/dependency/types";
import { IProgrammingLanguageLevelData, IScraper } from "@/interfaces/scraper";
import { inject, injectable } from "inversify";
import { By } from "selenium-webdriver";
import { SeleniumDriverService } from "./SeleniumDriverService";

@injectable()
export class CS697ScraperService implements IScraper {
  constructor(
    @inject(DEPENDENCY_TYPES.SeleniumDriverService)
    private seleniumDriverService: SeleniumDriverService,
    private scrapeUrl: string = "http://www.cs.bsu.edu/homepages/dmz/cs697/langtbl.htm",
  ) {}

  public async scrape() {
    const driver = this.seleniumDriverService.buildDriver();

    await driver.get(this.scrapeUrl);

    // the page has three divs, each div has a table inside
    const divs = await driver.findElements(By.css("div"));

    // second div is what we want
    const dataTableDiv = divs[1];
    const tableRows = await dataTableDiv.findElements(By.css("tr"));

    const jsonData: IProgrammingLanguageLevelData[] = [];

    // first row is the header
    for (let index = 1; index < tableRows.length; index++) {
      const currentRow = tableRows[index];
      const cells = await currentRow.findElements(By.css("td"));
      const jsonified: IProgrammingLanguageLevelData = {
        language: await cells[0].getText(),
        level: Number.parseFloat(await cells[1].getText()),
        averageSourceStatements: Number.parseInt(await cells[2].getText()),
      };
      jsonData.push(jsonified);
    }

    return jsonData;
  }
}
