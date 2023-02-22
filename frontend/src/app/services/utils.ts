import { environment } from 'src/environments/environment';

export function getBaseUrl() {
  return environment.baseUrl;
}

export function getToken() {
  return localStorage.getItem('dis-token') || '';
}

export function getHeaders() {
  return {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  };
}
