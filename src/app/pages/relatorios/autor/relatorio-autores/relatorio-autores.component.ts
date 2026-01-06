import { Component } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelatorioAutorService } from '../../../../services/relatorios/relatorio-autor.service';

@Component({
  selector: 'app-relatorio-autores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio-autores.component.html'
})
export class RelatorioAutoresComponent {

  codau?: number;
  carregando = false;
  erro = '';

  constructor(private relatorioService: RelatorioAutorService,
    private location: Location
  ) {}

  /*gerarRelatorio2(): void {
    this.carregando = true;
    this.erro = '';

    this.relatorioService.gerarRelatorioAutores2(this.codau)
      .subscribe({
        next: (pdf: Blob) => {
          const blob = new Blob([pdf], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
          this.carregando = false;
        },
        error: () => {
          this.erro = 'Erro ao gerar relatório';
          this.carregando = false;
        }
      });
  }*/

  gerarRelatorio(): void {
    this.carregando = true;
    this.erro = '';

    this.relatorioService.gerarRelatorioAutores(this.codau)
      .subscribe({
        next: (response) => {
    const blob = response.body;

    if (!blob || blob.size === 0) {
      this.erro = 'PDF vazio recebido do servidor';
      this.carregando = false;
      return;
  }

  const fileURL = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = fileURL;
  a.target = '_blank';
  a.rel = 'noopener';
  a.click();

  URL.revokeObjectURL(fileURL);
  this.carregando = false;
},

        error: () => {
          this.erro = 'Erro ao gerar relatório';
          this.carregando = false;
        }
      });
  }

  

  limparFiltro(): void {
    this.codau = undefined;
  }

  voltar() {
  this.location.back();
}
}
