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

	goToCorreos(){
		//window.open('./assets/excel/informe.php','_blank');
		window.open('informe.php','_blank');
		//window.open('./assets/pdf/propuesta-mejor-economia.pdf','_blank');
		
	}

	signOut(){
	    this.serviceLoginAdmin.deleteSession();
	    this.router.navigate(['admin/login']);
	  }

	

}
