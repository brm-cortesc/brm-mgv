import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


//Servicios
import { browserWindowProvider, windowProvider } from "../services/window.service";
import { RequestService } from '../services/request/app.request';

// Rutas
import { AdminRoutingModule } from './admin-routing.module';


//Components App
import { SignOutComponent }      from './components/sign-out/sign-out';
import { AlertToastComponent }      from './components/alert-toast/alert-toast';
import { FormPropuestaComponent }      from './components/form-propuesta/form-propuesta';
import { FormNoticiaComponent }      from './components/form-noticia/form-noticia';
import { FormSliderComponent }      from './components/form-slider/form-slider';
import { HeaderAdmin }      from './components/header-admin/header-admin.component';


//Admin
import { AdminLogin }      from './login/login';
import { AdminReports }      from './reports/reports';
import { AdminDashboard }      from './dashboard/dashboard';
import { AdminPropuestas }      from './propuestas/propuestas';
import { AdminPropuesta }      from './propuesta/propuesta';
import { AdminNoticias }      from './noticias/noticias';
import { AdminNoticia }      from './noticia/noticia';
import { AdminSliders }      from './sliders/sliders';
import { AdminSlider }      from './slider/slider';
import { AdminBiografia }      from './biografia/biografia';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    NgbModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignOutComponent,
    AlertToastComponent,
    FormPropuestaComponent,
    FormNoticiaComponent,
    FormSliderComponent,
    HeaderAdmin,
    AdminLogin,
    AdminReports,
    AdminDashboard,
    AdminPropuestas,
    AdminPropuesta,
    AdminNoticias,
    AdminNoticia,
    AdminSliders,
    AdminSlider,
    AdminBiografia
  ],
  providers:[browserWindowProvider, windowProvider, RequestService]
})
export class AdminModule {


}
