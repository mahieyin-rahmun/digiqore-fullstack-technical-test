export interface IScraper {
  scrape(): Promise<any[]>;
}

export interface IProgrammingLanguageLevelData {
  language: string;
  level: number;
  averageSourceStatements: number;
}
