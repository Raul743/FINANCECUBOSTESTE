interface ICardDTO {
  id?: string;
  type: 'physical' | 'virtual';
  number: string;
  cvv: string;
  account?: string;
}
