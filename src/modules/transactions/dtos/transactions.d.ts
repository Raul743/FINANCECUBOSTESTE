interface ITransactionsDTO {
  id?: string;
  type: 'credit' | 'debit';
  value: string;
  description: string;
  counter: number;
}
