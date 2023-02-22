import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBaseUrl, getHeaders } from './utils';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl: string;
  headers: any;
  constructor(private http: HttpClient) {
    this.baseUrl = getBaseUrl();
    this.headers = getHeaders();
  }

  getPresignedUrls(image: any) {
    const authHeaders = this.headers.headers.Authorization;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', authHeaders);
    const params = new HttpParams()
      .set('name', image.name)
      .set('mime', image.type);
    const url = `${this.baseUrl}/image-sign`;
    return this.http.get(url, { params, headers });
  }

  uploadfileAWSS3(fileUploadUrl: string, contentType: string, file: any) {
    const headers = new HttpHeaders({
      'Content-Type': contentType,
      'x-amz-acl': 'public-read',
    });
    console.log({ fileUploadUrl });
    const req = new HttpRequest('PUT', fileUploadUrl, file, {
      headers: headers,
    });
    return this.http.request(req);
  }

  deleteFileAWSS3(name: string) {
    const url = `${this.baseUrl}/image/` + name;
    return this.http.delete(url, this.headers);
  }
}
