import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importamos las rutas
import {routing,appRoutingProviders} from './app.routing';
//importamos para el formulario
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    IssuesComponent,
    ComentariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,  //ruta-------------------------
    FormsModule //formularios-----
  ],
  providers: [
    appRoutingProviders //ruta-----------------
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
