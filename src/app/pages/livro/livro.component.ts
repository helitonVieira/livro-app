import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LivroService } from '../../services/livro.service';
import { AutorService } from '../../services/autor.service';
import { AssuntoService } from '../../services/assunto.service';

import { Livro } from '../../models/livro.model';
import { LivroDTO } from '../../models/livro.dto.model';
import { Autor } from '../../models/autor.model';
import { Assunto } from '../../models/assunto.model';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent implements OnInit {

  /* ===== LISTAS ===== */
  livros = signal<Livro[]>([]);
  autores = signal<Autor[]>([]);
  assuntos = signal<Assunto[]>([]);

  /* ===== CONTROLE ===== */
  editando = false;
  erro = '';

  /* ===== FORM (DTO) ===== */
  livroForm: LivroDTO = this.novoLivro();

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService
  ) {}

  ngOnInit(): void {
    this.loadLivros();
    this.loadAutores();
    this.loadAssuntos();
  }

  /* ================= LOAD ================= */

  loadLivros(): void {
    this.livroService.findAll().subscribe({
      next: data => this.livros.set(data),
      error: () => this.erro = 'Erro ao carregar livros'
    });
  }

  loadAutores(): void {
    this.autorService.findAll()
      .subscribe(data => this.autores.set(data));
  }

  loadAssuntos(): void {
    this.assuntoService.findAll()
      .subscribe(data => this.assuntos.set(data));
  }

  /* ================= CRUD ================= */

  salvar(): void {
    if (!this.validar()) return;

    if (this.editando && this.livroForm.id) {
      this.livroService.update(this.livroForm.id, this.livroForm)
        .subscribe(() => this.resetForm());
    } else {
      this.livroService.create(this.livroForm)
        .subscribe(() => this.resetForm());
    }
  }

  editar(livro: Livro): void {
    this.livroForm = {
      id: livro.codl,
      titulo: livro.titulo,
      editora: livro.editora,
      edicao: livro.edicao,
      anoPublicacao: livro.anoPublicacao,
      valor: livro.valor,
      autoresIds: livro.autores.map(a => a.id!),
      assuntosIds: livro.assuntos.map(s => s.id!)
    };
    this.editando = true;
  }

  excluir(livro: Livro): void {
    if (!livro.codl) return;

    if (confirm(`Excluir o livro "${livro.titulo}"?`)) {
      this.livroService.delete(livro.codl)
        .subscribe(() => this.loadLivros());
    }
  }

  /* ================= AUX ================= */

  resetForm(): void {
    this.livroForm = this.novoLivro();
    this.editando = false;
    this.erro = '';
    this.loadLivros();
  }

  novoLivro(): LivroDTO {
    return {
      titulo: '',
      editora: '',
      edicao: 1,
      anoPublicacao: new Date().getFullYear(),
      valor: 0,
      autoresIds: [],
      assuntosIds: []
    };
  }

  validar(): boolean {
    if (!this.livroForm.titulo.trim()) {
      this.erro = 'Título é obrigatório';
      return false;
    }

    if (!this.livroForm.editora.trim()) {
      this.erro = 'Editora é obrigatória';
      return false;
    }

    if (this.livroForm.edicao <= 0) {
      this.erro = 'Edição inválida';
      return false;
    }

    if (this.livroForm.anoPublicacao < 1500) {
      this.erro = 'Ano de publicação inválido';
      return false;
    }

    if (this.livroForm.valor <= 0) {
      this.erro = 'Valor deve ser maior que zero';
      return false;
    }

    if (this.livroForm.autoresIds.length === 0) {
      this.erro = 'Selecione ao menos um autor';
      return false;
    }

    if (this.livroForm.assuntosIds.length === 0) {
      this.erro = 'Selecione ao menos um assunto';
      return false;
    }

    this.erro = '';
    return true;
  }
}
