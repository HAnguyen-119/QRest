export type role = 'admin' | 'waiter' | 'cashier' | 'chef'

export interface Authentication {
  username: string,
  password: string,
  role: role
}

export interface Login {
    username: string,
    password: string,
}