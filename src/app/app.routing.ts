import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//importamos las paginas
import { InicioComponent } from './pages/inicio/inicio.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';

const appRoutes: Routes = 
    [
        {path:'', component:InicioComponent},
        {path:'issues/:name/:repo', component:IssuesComponent},
        {path:'comentarios/:name/:repo/:number', component:ComentariosComponent},
        {path:'**', component:InicioComponent},
    ];

//exportamos
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
