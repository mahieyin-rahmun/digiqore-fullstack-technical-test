import { injectable } from "inversify";

// a basic service class for bootstrapping purposes
@injectable()
class IndexService {
  /**
   * a simple method to greet the user
   * @returns a greeting message
   */
  public greet(): string {
    return "Hello World from Scraper";
  }
}

export default IndexService;
