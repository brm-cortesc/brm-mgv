import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


//Servicios
import { browserWindowProvider, windowProvider } from "../services/window.service";
import { RequestService } from '../services/request/app.request';


//Modulo para sliders
import { SlickModule } from 'ngx-slick';

import { PublicRoutingModule } from './public-routing.module';

//Header
import {HeaderComponent} from './components/header/header.component'

// footer
import {FooterComponent} from './components/footer/footer.component'



// Vistas
import { HomeComponent } from './home/home.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BioComponent } from './bio/bio.component';

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
    HomeComponent,
    PropuestasComponent,
    NoticiasComponent,
    ContactoComponent,
  	BioComponent
  ],
  providers:[browserWindowProvider, windowProvider, RequestService]
})
export class PublicModule { }
