export interface Client {
  client_id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface listClients {
  clients: Client[];
}
