import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BioComponent } from './bio/bio.component';
import { TerminosComponent } from './terminos/terminos.component';
import { NotFoundComponent } from './404/404.component';


const routes: Routes = [
	{path:'', component: HomeComponent},
	{
		path:'propuestas',
		children:[
			{ path: '', component: PropuestasComponent },
			{ path: ':id', component: PropuestasComponent }
		]
	},
	{
		path:'noticias',
		children:[
			{ path: '', component: NoticiasComponent },
			{ path: ':id', component: NoticiasComponent }
		]
	},
	{path: 'comunicacion', component: ComunicacionComponent},
	{path: 'contacto', component: ContactoComponent},
	{path: 'biografia', component: BioComponent},
	{path: '404', component: NotFoundComponent},
	{path: 'terminos', component: TerminosComponent},
	{path: '**', redirectTo: '404'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
