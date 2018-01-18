import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BioComponent } from './bio/bio.component';


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
	{path: 'contacto', component: ContactoComponent},
	{path: 'biografia', component: BioComponent},
	//{path: '404', component: HomeComponent},
	{path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
