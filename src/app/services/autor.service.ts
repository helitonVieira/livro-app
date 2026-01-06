import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor.model';


@Injectable({
  providedIn: 'root',
})
export class AutorService {

  private baseUrl = 'http://localhost:8080/api/v1/autores';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.baseUrl);
    
  }

  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.baseUrl}/${id}`);
  }

  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.baseUrl, autor);
  }

  update(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrl}/${id}`, autor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
