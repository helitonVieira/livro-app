import { Component, signal, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Assunto } from '../../models/assunto.model';
import { AssuntoService } from '../../services/assunto.service';

@Component({
  selector: 'app-assunto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assunto.component.html',
  styleUrl: './assunto.component.css',
})
export class AssuntoComponent implements OnInit {

  assuntoes = signal<Assunto[]>([]);
  assuntoForm: Assunto = { descricao: '' };
  editando = false;

  constructor(private assuntoService: AssuntoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadAssuntoes();
  }

  loadAssuntoes(): void {
    this.assuntoService.findAll().subscribe(data => {
     console.log('ANTES set:', this.assuntoes());
    console.log('CHEGOU:', data);
    this.assuntoes.set(data);
    console.log('DEPOIS set:', this.assuntoes());
    });
  }

  salvar(): void {
    if (this.editando && this.assuntoForm.id) {
      this.assuntoService.update(this.assuntoForm.id, this.assuntoForm)
        .subscribe(() => {
          this.loadAssuntoes();
          this.resetForm();
        });
    } else {
      this.assuntoService.create(this.assuntoForm)
        .subscribe(() => {
          this.loadAssuntoes();
          this.resetForm();
        });
    }
  }

  editar(assunto: Assunto): void {
    this.assuntoForm = { ...assunto };
    this.editando = true;
  }

  excluir(assunto: Assunto): void {
    if (!assunto.id) return;

    if (confirm(`Excluir o assunto "${assunto.descricao}"?`)) {
      this.assuntoService.delete(assunto.id)
        .subscribe(() => this.loadAssuntoes());
    }
  }

  resetForm(): void {
    this.assuntoForm = { descricao: '' };
    this.editando = false;
  }

  voltar() {
    this.location.back();
  }  

}
