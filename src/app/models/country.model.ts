export class Country {
  title!: string;
  isoCode!: string;
  teleCode!: string;
  hasState!: number;
  icon!: string;
  currency!: Currency;
  status!: number;
  id!: string;
}

export class Currency {
  title!: string;
}
