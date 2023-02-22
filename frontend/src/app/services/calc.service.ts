import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl, getHeaders } from './utils';
import { FormObject } from '../interfaces/Forms';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  headers: any;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.headers = getHeaders();
    this.baseUrl = getBaseUrl();
  }

  calculate(form: FormObject) {
    const url = `${this.baseUrl}/calculate`;
    return this.http.post(url, form, this.headers);
  }

  getSizes() {
    let sizes = [
      { name: 'No aplica', divider: 0 },
      { name: '17.5x12.5 cms (1/32)', divider: 32 },
      { name: '20x14 cms (1/25)', divider: 25 },
      { name: '22x14 cms (1/22)', divider: 22 },
      { name: '25x14 cms (1/20)', divider: 20 },
      { name: '23x16.5 cms (1/18)', divider: 18 },
      { name: '25x17.5 cms (1/16)', divider: 16 },
      { name: '20x23 cms (1/15)', divider: 15 },
      { name: '25x23 cms (1/12)', divider: 12 },
      { name: '30x20 cms (1/11)', divider: 11 },
      { name: '22x28 cms (1/10)', divider: 10 },
      { name: '23x33 cms (1/9)', divider: 9 },
      { name: '25x35 cms (1/8)', divider: 8 },
      { name: '35x33 cms (1/6)', divider: 6 },
      { name: '48x28 cms (1/5)', divider: 5 },
      { name: '50x35 cms (1/4)', divider: 4 },
      { name: '70x33 cms (1/3)', divider: 3 },
      { name: '70x50 cms (1/2)', divider: 2 },
      { name: '70x100 cms (1)', divider: 1 },
    ];
    return sizes;
  }

  getPercentages() {
    return Array(10)
      .fill(1)
      .map((val, i) => {
        return { name: `${i * 10}%`, value: `0.${i}` };
      });
  }

  getLabelFieldsHandWork() {
    return [
      'Diseño',
      'Numerada',
      'Perforada',
      'Troquelada',
      'Encuadernación',
      'Plastificado',
      'Reserva UV',
      'Empaque y Envio',
      '',
    ];
  }
}
