// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api'; // Replace with your actual backend API URL
  isLoggedIn: any;
  redirectUrl: { new(url: string | URL, base?: string | URL): URL; prototype: URL; createObjectURL(obj: Blob | MediaSource): string; revokeObjectURL(url: string): void; } | undefined;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }
}

/*
export class AuthService {
  private readonly baseUrl = 'https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }
*/
