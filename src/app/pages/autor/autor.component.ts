import { Component, signal, OnInit } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Autor } from '../../models/autor.model';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css',
})
export class AutorComponent implements OnInit {

  autores = signal<Autor[]>([]);
  autorForm: Autor = { nome: '' };
  editando = false;

  constructor(private autorService: AutorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.findAll().subscribe(data => {      
    this.autores.set(data);    
    });
  }

  salvar(): void {
    if (this.editando && this.autorForm.id) {
      this.autorService.update(this.autorForm.id, this.autorForm)
        .subscribe(() => {
          this.loadAutores();
          this.resetForm();
        });
    } else {
      this.autorService.create(this.autorForm)
        .subscribe(() => {
          this.loadAutores();
          this.resetForm();
        });
    }
  }

  editar(autor: Autor): void {
    this.autorForm = { ...autor };
    this.editando = true;
  }

  excluir(autor: Autor): void {
    if (!autor.id) return;

    if (confirm(`Excluir o autor "${autor.nome}"?`)) {
      this.autorService.delete(autor.id)
        .subscribe(() => this.loadAutores());
    }
  }

  resetForm(): void {
    this.autorForm = { nome: '' };
    this.editando = false;
  }

  voltar() {
    this.location.back();
  }
}
