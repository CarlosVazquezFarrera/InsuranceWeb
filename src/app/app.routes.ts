import { Routes } from '@angular/router';
import { AppRoutes } from './routes/AppRoues';

export const routes: Routes = [
    { path: '', redirectTo: AppRoutes.registro, pathMatch: 'full' },
    { path: AppRoutes.registro,  loadComponent: () => import('@components/registro/registro.component').then(c => c.RegistroComponent),},
    { path: AppRoutes.registros,  loadComponent: () => import('@components/registros/registros.component').then(c => c.RegistrosComponent),},

];
