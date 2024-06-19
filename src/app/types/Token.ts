export interface IListToken {
  token_id: string;
  currency: string;
}

export interface ITokenInfo extends IListToken {
  date: string;
  price: number;
}
