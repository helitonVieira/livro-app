import { Autor } from './autor.model';
import { Assunto } from './assunto.model';

export interface Livro {
  codl: number;
  titulo: string;
  editora: string;
  edicao: number;
  anoPublicacao: number;
  valor: number;
  autores: Autor[];
  assuntos: Assunto[];
}