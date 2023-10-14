export class Country {
  title!: string;
  isoCode!: string;
  teleCode!: string;
  hasState!: number;
  icon!: string;
  currency!: Currency;
  status!: number;
  createdAt!: string;
  updatedAt!: string;
  id!: string;
}

export class Currency {
  title!: string;
}
