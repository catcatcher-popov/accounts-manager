export type Label = { readonly text: string }

export enum AccountType {
  LDAP  = 'LDAP',
  LOCAL = 'Local'
}

export interface Account {
  readonly id: string

  labels: Array<Label>

  type: AccountType

  login: string

  password: string | null
}
