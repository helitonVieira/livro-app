import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AutorComponent } from './pages/autor/autor.component';
import { AssuntoComponent } from './pages/assunto/assunto.component';
import { LivroComponent } from './pages/livro/livro.component';
import { RelatorioAutoresComponent } from './pages/relatorios/autor/relatorio-autores/relatorio-autores.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'autor', component: AutorComponent },
     { path: 'assunto', component: AssuntoComponent },
     { path: 'livro', component: LivroComponent },
     { path: 'relatorio-autores', component: RelatorioAutoresComponent },
];
