import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { FormClientComponent } from '../components/form-client/form-client';
import { AlertToastComponent } from '../components/alert-toast/alert-toast';

@Component({
  templateUrl: './propuesta.html',
  // styleUrls: ['./reports.css'],
  providers: [RequestService, LoginAdminService,FormClientComponent]
})

export class AdminPropuesta {
	client:any = [];
	idClient: any;
	@ViewChild(AlertToastComponent) toast:AlertToastComponent;
	
	constructor(private serviceLoginAdmin: LoginAdminService,
		private route: ActivatedRoute,
		private serviceRequest: RequestService,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{

			this.idClient = this.route.snapshot.params['i'];
		}
	}
}
