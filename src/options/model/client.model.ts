

export interface IClientBase {
  client_id: number
  full_name: string,
  telephone: string,
}

export interface IClientCreate extends IClientBase {
  email: string,
}

export interface IClient extends IClientCreate {
  amount_visits: number,
  bonus: number,
  estate: string,
}

export interface ClientUpdate {
  full_name: string,
  telephone: string,
  email: string,
}