import { DataTypes, ModelDefined } from 'sequelize';
import { baseModelProps, db } from '.';

interface QuoteProps {
  author: string;
  key: string;
  quote: string;
}

interface QuoteCreationProps extends QuoteProps {}
export type QuoteModel = ModelDefined<QuoteProps, QuoteCreationProps>;

const Quote: QuoteModel = db.define(
  'Quote',
  {
    ...baseModelProps,
    author: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'quotes',
  }
);

export async function createQuote(props: QuoteProps) {
  const newQuote = await Quote.create(props);
  return `Quote has been added, use \`${newQuote._attributes.key}\` to use the quote`;
}

export async function getQuote(key: string) {
  const quote = await Quote.findOne({
    where: { key },
    rejectOnEmpty: true,
  });
  return quote;
}

export async function getAllQuotes() {
  const quotes = await Quote.findAll();
  return quotes;
}
