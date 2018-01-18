import { NgModule } from '@angular/core';
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
import { FormClientComponent }      from './components/form-client/form-client';
import { FormUserClientComponent }      from './components/form-user-client/form-user-client';



//Admin¡
import { AdminLogin }      from './login/login';
import { AdminReports }      from './reports/reports';
import { AdminDashboard }      from './dashboard/dashboard';
import { AdminPropuestas }      from './propuestas/propuestas';
import { AdminPropuesta }      from './propuesta/propuesta';

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
    FormClientComponent,
    FormUserClientComponent,
    AdminLogin,
    AdminReports,
    AdminDashboard,
    AdminPropuestas,
    AdminPropuesta
  ],
  providers:[browserWindowProvider, windowProvider, RequestService]
})
export class AdminModule { }
