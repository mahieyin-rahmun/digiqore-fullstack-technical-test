export type TProgrammingLanguageLevelData = {
  id: string;
  language: string;
  level: number;
  averageSourceStatements: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TTableProps = {
  data: TProgrammingLanguageLevelData[];
};
