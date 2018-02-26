import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  templateUrl: './dashboard.html',
  providers: [RequestService, LoginAdminService]
})

export class AdminDashboard {
	constructor(private serviceLoginAdmin: LoginAdminService,
		private serviceRequest: RequestService,
		@Inject(DOCUMENT) private document: any,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{
			this.document.body.classList.remove('login');
		}
	}

	signOut(){
		this.serviceLoginAdmin.deleteSession();
		this.router.navigate(['admin/login']);
	}

	goToClients(){
		this.router.navigate(['admin/propuestas']);
	}
	
	goToReports(){
		this.router.navigate(['admin/reports']);
	}

	goToNoticias(){
		this.router.navigate(['admin/noticias']);
	}

	goToSliders(){
		this.router.navigate(['admin/sliders']);
	}

	goToBiografia(){
		this.router.navigate(['admin/biografia']);
	}

}
