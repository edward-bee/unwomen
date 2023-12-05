import { apiUrl } from '../variable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductByUsersDetailsService {
  constructor(private http: HttpClient) {}

  getProductByUsersDetails(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => {
        observer.error('Authentication token is missing or expired');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${apiUrl}products-by-role/${id}`, { headers });
  }
}
