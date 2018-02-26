import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { AlertToastComponent } from '../components/alert-toast/alert-toast';

@Component({
  templateUrl: './slider.html',
  // styleUrls: ['./reports.css'],
  providers: [RequestService, LoginAdminService]
})

export class AdminSlider {
	client:any = [];
	idSlider: any;
	@ViewChild(AlertToastComponent) toast:AlertToastComponent;
	
	constructor(private serviceLoginAdmin: LoginAdminService,
		private route: ActivatedRoute,
		private serviceRequest: RequestService,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{

			this.idSlider = this.route.snapshot.params['i'];
		}
	}
}
