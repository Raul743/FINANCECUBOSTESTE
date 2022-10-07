import { People } from '~/models/People';

export const validEmail = (email: string) => {
  return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
};

export function removeMaskForCpfOrCnpj(cpf: string) {
  return cpf.replace(/\D/g, '');
}
export function maskForAccountNumber(account: string) {
  return account
    .split('')
    .map((a) => (a != '-' ? 'X' : a))
    .join('');
}

export function maskForCardNumber(card: string) {
  const pattern = 'XXXX-XXXX-XXXX-';
  const splittedNumber = card.split(' ');
  const result = pattern + splittedNumber[splittedNumber.length - 1];

  return result;
}

export class LoggedInService {
  static people: People;

  static get getPeople() {
    return LoggedInService.people;
  }
}
