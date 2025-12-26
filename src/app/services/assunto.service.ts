import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto } from '../models/assunto.model';


@Injectable({
  providedIn: 'root',
})
export class AssuntoService {

  private baseUrl = 'http://localhost:8080/assunto';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.baseUrl);
    
  }

  findById(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.baseUrl}/${id}`);
  }

  create(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.baseUrl, assunto);
  }

  update(id: number, assunto: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.baseUrl}/${id}`, assunto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
