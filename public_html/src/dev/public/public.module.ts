import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


//Servicios
import { browserWindowProvider, windowProvider } from "../services/window.service";
import { WindowRef } from "../services/windowObj.service";
import { RequestService } from '../services/request/app.request';


//Modulo para sliders
import { SlickModule } from 'ngx-slick';

// Rutas
import { PublicRoutingModule } from './public-routing.module';

//Header
import {HeaderComponent} from './components/header/header.component'

//navegacion descargas
import {NavDesComponent} from './components/nav-descargas/nav-descargas.component'

// footer
import {FooterComponent} from './components/footer/footer.component'



// Vistas
import { HomeComponent } from './home/home.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { BoletinComponent } from './boletin/boletin.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BioComponent } from './bio/bio.component';
import { TerminosComponent } from './terminos/terminos.component';
import { NotFoundComponent } from './404/404.component';

// import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    NgbModule,
    SlickModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
  	HeaderComponent,
    FooterComponent,
  	NavDesComponent,
    HomeComponent,
    ComunicacionComponent,
    BoletinComponent,
    PropuestasComponent,
    NoticiasComponent,
    ContactoComponent,
    TerminosComponent,
    NotFoundComponent,
  	BioComponent
  ],
  providers:[browserWindowProvider, windowProvider, RequestService, WindowRef]
})
export class PublicModule { }
