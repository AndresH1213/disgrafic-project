import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { getBaseUrl, getToken } from './utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string;
  token: string;
  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = getBaseUrl();
    this.token = getToken();
  }

  hasToken() {
    return Boolean(this.token);
  }

  loginUser(form: any) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, form).pipe(
      tap((resp: any) => {
        console.log('tap login service', resp);
        this.saveLocalStorage(resp.token);
      })
    );
  }

  logOut() {
    localStorage.removeItem('dis-token');
    this.router.navigateByUrl('');
  }

  saveLocalStorage(token: string) {
    console.log('saveLocal', token);
    localStorage.setItem('dis-token', token);
  }

  validateToken(): Observable<boolean> {
    const token = getToken();
    console.log('validate_token', token);
    const url = `${this.baseUrl}/login/validate?token=${token}`;
    return this.http.get(url).pipe(
      map(() => true),
      catchError((err) => of(false))
    );
  }
}
