import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHeaders, getBaseUrl } from './utils';
import { Client } from '../interfaces/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  headers: any;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.headers = getHeaders();
    this.baseUrl = getBaseUrl();
  }

  getClients() {
    const url = `${this.baseUrl}/client`;
    return this.http.get(url);
  }

  getClient(id: string) {
    const url = `${this.baseUrl}/client/` + id;
    return this.http.get(url);
  }

  createClient(client: Client) {
    const url = `${this.baseUrl}/client`;
    return this.http.post(url, { ...client }, this.headers);
  }

  updateClient(id: string, attrs: any) {
    const url = `${this.baseUrl}/client/` + id;
    return this.http.put(url, attrs, this.headers);
  }

  deleteClient(id: string) {
    const url = `${this.baseUrl}/client/` + id;
    return this.http.delete(url, this.headers);
  }
}
