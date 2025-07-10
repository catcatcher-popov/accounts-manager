import { AccountType } from '@/types/account.types';
import type { Account } from '@/types/account.types';

export type AccountValidationErrors = Record<keyof Account, Array<string>>;

export function validateAccount(account: Account): AccountValidationErrors {
  const errors: AccountValidationErrors = {
    id: [],
    labels: [],
    type: [],
    login: [],
    password: [],
  };

  if (!account.login.trim()) {
    errors.login = [...errors.login, 'Логин обязателен'];
  } else if (account.login.length > 100) {
    errors.login = [...errors.login, 'Логин не должен превышать 100 символов'];
  }

  if (account.type === AccountType.LOCAL) {
    if (!account.password || !account.password.trim()) {
      errors.password = [...errors.password, 'Пароль обязателен для локальной учетной записи'];
    } else if (account.password.length > 100) {
      errors.password = [...errors.password, 'Пароль не должен превышать 100 символов'];
    }
  }

  for (const { text } of account.labels) {
    if (text.length > 50) {
      errors.labels = [...errors.labels, 'Каждая метка не должна превышать 50 символов'];
      break;
    }
  }

  return errors;
}
