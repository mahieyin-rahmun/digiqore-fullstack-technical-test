import { ITimestamps } from "./common";

export interface IScraper {
  scrape(): Promise<any[]>;
}

export interface IProgrammingLanguageLevelData extends ITimestamps {
  id?: string;
  language: string;
  level: number;
  averageSourceStatements: number;
}
