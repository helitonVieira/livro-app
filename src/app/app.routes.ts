import { Routes } from '@angular/router';
import { AutorComponent } from './pages/autor/autor.component';
import { AssuntoComponent } from './pages/assunto/assunto.component';

export const routes: Routes = [
     { path: 'autor', component: AutorComponent },
     { path: 'assunto', component: AssuntoComponent },
];
