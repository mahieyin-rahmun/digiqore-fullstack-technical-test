const DEPENDENCY_TYPES = {
  IndexService: Symbol.for("IndexService"),
  IndexController: Symbol.for("IndexController"),

  SeleniumDriverService: Symbol.for("SeleniumDriverService"),
  ScraperService: Symbol.for("ScraperService"),
  CS697ScraperController: Symbol.for("CS697ScraperController"),
};

export { DEPENDENCY_TYPES };
