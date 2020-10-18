import { DataTypes, Model, Sequelize } from 'sequelize';

export const db: Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

export const baseModelProps = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
};

export class BaseModel extends Model {
  public id!: number;
}
