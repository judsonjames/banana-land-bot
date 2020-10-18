import { DataTypes } from 'sequelize';
import { BaseModel, baseModelProps, db } from '.';

interface QuoteProps {
  author: string;
  key: string;
  quote: string;
}

export class Quote extends BaseModel {
  public author!: string;
  public key!: string;
  public quote!: string;
}

Quote.init(
  {
    ...baseModelProps,
    author: { type: DataTypes.STRING, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    quote: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'quotes', sequelize: db }
);

export async function createQuote(props: QuoteProps) {
  const newQuote = await Quote.create(props);
  return `Quote has been added, use \`${newQuote.key}\` to use the quote`;
}

export async function getQuote(key: string) {
  const quote = await Quote.findOne({ where: { key }, rejectOnEmpty: true });
  return quote;
}

export async function getAllQuotes() {
  const quotes = await Quote.findAll();
  return quotes;
}
