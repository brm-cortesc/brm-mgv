import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLogin } from './login/login';
import { AdminReports } from './reports/reports';
import { AdminDashboard } from './dashboard/dashboard';
import { AdminPropuestas } from './propuestas/propuestas';
import { AdminPropuesta } from './propuesta/propuesta';



const routes: Routes = [
	{ path: 'admin', redirectTo: 'admin/login', pathMatch: 'full'},
	{ path: 'admin', 
		children: [
			{path: '', component: AdminLogin},
			{path: 'login', component: AdminLogin},
			{path: 'reports', component: AdminReports},
			{path: 'dashboard', component: AdminDashboard},
			{path: 'propuestas', component: AdminPropuestas},
			{path: 'propuesta', component: AdminPropuesta},
		]
	}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
