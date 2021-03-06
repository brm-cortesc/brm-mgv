import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { AlertToastComponent } from '../components/alert-toast/alert-toast';

@Component({
  templateUrl: './sliders.html',
  // styleUrls: ['./reports.css'],
  providers: [RequestService, LoginAdminService]
})

export class AdminSliders {
	sliders:any = [];
	activeS:boolean = false;

	@ViewChild(AlertToastComponent) toast:AlertToastComponent;

	constructor(private serviceLoginAdmin: LoginAdminService,
		private serviceRequest: RequestService,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{
			this.serviceRequest.post('app.php', { accion: 'getSliders'})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							//this.toast.openToast(result.data,null,5,null);
							this.sliders = result.data;
							break;
						case 2:
							this.toast.openToast("No existen sliders",null,5,null);
							break;
					}
				},
				(error) =>  {
					console.log(error)
				});
		}
	}

	goToSlider(id){
		this.router.navigate(['admin/slider', { i: id } ]);
	}
	
	toggleClass(){
      this.activeS = !this.activeS;
  	}

  	insertSlider(slider){
		this.toast.openToast("Agregó correctamente el slider",null,5,null);
		this.activeS = false;
		this.sliders.push(slider);
	}

  	removeSlider(id){
		var conf = confirm("Desea eliminar el slider?");
		if (conf == true) {
	  		this.serviceRequest.post('app.php', { accion: 'removeSlider',id: id})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.toast.openToast("Se ha eliminado la noticia correctamente",null,3,()=>{
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
