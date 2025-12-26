export interface LivroDTO {
  id?: number;
  titulo: string;
  editora: string;
  edicao: number;
  anoPublicacao: number;
  valor: number;
  autoresIds: number[];
  assuntosIds: number[];
}