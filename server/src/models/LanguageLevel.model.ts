import {
  Sequelize,
  DataTypes,
  Model,
  Optional,
  ModelAttributes,
} from "sequelize";
import { IProgrammingLanguageLevelData } from "@interfaces/scraper";
import { ITimestamps } from "@interfaces/common";

export const LanguageLevelTableName = "LanguageLevelData";
export type LanguageLevelCreationAttributes = Optional<
  IProgrammingLanguageLevelData,
  "id"
>;

export class LanguageLevelModel
  extends Model<IProgrammingLanguageLevelData, LanguageLevelCreationAttributes>
  implements IProgrammingLanguageLevelData, ITimestamps
{
  public id?: string;
  public language: string;
  public level: number;
  public averageSourceStatements: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const LanguageLevelModelAttributes: ModelAttributes<
  LanguageLevelModel,
  Optional<IProgrammingLanguageLevelData, never>
> = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  language: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  level: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  averageSourceStatements: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

export default function (sequelize: Sequelize): typeof LanguageLevelModel {
  LanguageLevelModel.init(LanguageLevelModelAttributes, {
    tableName: LanguageLevelTableName,
    sequelize,
  });

  return LanguageLevelModel;
}
