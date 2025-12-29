import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatorioAutorService {

  private baseUrl = 'http://localhost:8080/relatorios/autores';

  constructor(private http: HttpClient) {}

  gerarRelatorioAutores2(codau?: number): Observable<Blob> {
    if (codau) {
      return this.http.get(`${this.baseUrl}?codau=${codau}`, {
        responseType: 'blob'
      });
    }

    return this.http.get(this.baseUrl, {
      responseType: 'blob'
    });
  }

  gerarRelatorioAutores(codau?: number) {
    const url = codau
      ? `${this.baseUrl}?codau=${codau}`
      : this.baseUrl;

    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
