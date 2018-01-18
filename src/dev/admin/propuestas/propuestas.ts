import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { AlertToastComponent } from '../components/alert-toast/alert-toast';

@Component({
  templateUrl: './propuestas.html',
  // styleUrls: ['./reports.css'],
  providers: [RequestService, LoginAdminService]
})

export class AdminPropuestas {
	propuestas:any = [];
	activeS:boolean = false;

	@ViewChild(AlertToastComponent) toast:AlertToastComponent;

	constructor(private serviceLoginAdmin: LoginAdminService,
		private serviceRequest: RequestService,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{
			this.serviceRequest.post('app.php', { accion: 'getPropuestas'})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							//this.toast.openToast(result.data,null,5,null);
							this.propuestas = result.data;
							break;
						case 2:
							this.toast.openToast("No existen clientes",null,5,null);
							break;
					}
				},
				(error) =>  {
					console.log(error)
				});
		}
	}

	goToClient(idClient){
		this.router.navigate(['admin/propuesta', { i: idClient } ]);
	}
	
	toggleClass(){
      this.activeS = !this.activeS;
  	}

  	removePropuesta(idClient){
		var conf = confirm("Desea eliminar la propuesta?");
		if (conf == true) {
	  		this.serviceRequest.post('app.php', { accion: 'removePropuesta',id: idClient})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.toast.openToast("Se ha eliminado la propuesta correctamente",null,3,()=>{
								window.location.reload();
							});
							break;
						case 2:
							this.toast.openToast("Usuario incorrecto",null,5,null);
							break;
						case 3:
							this.toast.openToast("Usuario incorrecto",null,5,null);
							break;
					}
				},
				(error) =>  {
					console.log(error)
				});
		}
  	}

}
