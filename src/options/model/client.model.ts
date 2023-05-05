

export interface IClientBase {
  client_id: number
  full_name: string, 
  telephone: string, 
}

export interface IClientAdd extends IClientBase {
  email: string | null,
}

export interface IClient extends IClientAdd {
  client_id: number,
  amount_visits: number,
  bonus: number,
  estate: string,
}
