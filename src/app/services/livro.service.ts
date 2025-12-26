import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../models/livro.model';
import { LivroDTO } from '../models/livro.dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {

  private api = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.api);
  }

   create(dto: LivroDTO): Observable<void> {
    return this.http.post<void>(this.api, dto);
  }

  update(id: number, dto: LivroDTO): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  
}
