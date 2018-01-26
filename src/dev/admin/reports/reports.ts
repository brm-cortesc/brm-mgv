import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { AlertToastComponent } from '../components/alert-toast/alert-toast';

@Component({
  templateUrl: './reports.html',
  // styleUrls: ['./reports.css'],
  providers: [RequestService, LoginAdminService]
})

export class AdminReports {
	encuestas:any = [];

	@ViewChild(AlertToastComponent) toast:AlertToastComponent;

	constructor(private serviceLoginAdmin: LoginAdminService,
		private serviceRequest: RequestService,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{
			//this.document.body.classList.remove('login');
		}
	}

	goToPropuesta(){
		//window.open('http://127.0.0.1/cambio_radical/mejorvargaslleras.com/propuestas_v2/informe.php?i=p','_blank');
		window.open('server/informe.php?i=p','_blank');
	}

	goToRegistro(){
		//window.open('http://127.0.0.1/cambio_radical/mejorvargaslleras.com/propuestas_v2/informe.php?i=r','_blank');
		window.open('server/informe.php?i=r','_blank');
	}

	goToContacto(){
		//window.open('http://127.0.0.1/cambio_radical/mejorvargaslleras.com/propuestas_v2/informe.php?i=c','_blank');
		window.open('server/informe.php?i=c','_blank');
	}

	signOut(){
	    this.serviceLoginAdmin.deleteSession();
	    this.router.navigate(['admin/login']);
	  }

	

}
