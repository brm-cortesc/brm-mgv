import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/app.request';
import { LoginAdminService } from '../../login/login.service';
import { AlertToastComponent } from '../../components/alert-toast/alert-toast';

@Component({
	selector: 'form-user-client',
	templateUrl: './form-user-client.html',
})
export class FormUserClientComponent {
	@Input() idUser;
	@Input() idClient;
	user:any = {id:'',contrasena:''};

	@ViewChild(AlertToastComponent) toast:AlertToastComponent;

	constructor(private serviceLoginAdmin: LoginAdminService,
		private route: ActivatedRoute,
		private serviceRequest: RequestService,
		private router: Router){
	}

	ngOnInit() {
		if (this.idUser != null) {
			this.serviceRequest.post('app.php', { accion: 'getAdminUsuario', idUsuario: this.idUser})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.user = result.data;
							break;
						case 2:
							this.toast.openToast("Usuario incorrecto",null,5,null);
							break;
					}
				},
				(error) =>  {
					console.log(error)
				});
		}else{
			this.idClient = '';
		}
	}

	setUser(){



		if (this.user.nombre != undefined && this.user.nombre != "" &&
			this.user.apellido != undefined && this.user.apellido != "" &&
			this.user.correo != undefined && this.user.correo != "" &&
			this.user.usuario != undefined && this.user.usuario != "") {
			let dataAdmin = this.serviceLoginAdmin.getSession();
			this.user.idAdmin = dataAdmin.id;
			this.user.idCuenta = this.idClient;
			this.user.accion = 'setAdminUsuario';
			this.user.contrasena = (this.idUser != '' && this.user.contrasena == null) ? '': this.user.contrasena;
			this.serviceRequest.post('app.php', this.user)
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							if (this.idUser != '') {
								this.toast.openToast("Actualizó correctamente al usuario",null,5,()=>{
									this.router.navigate(['propuestas/admin/clients']);
								});
							}else{
								this.toast.openToast("Agregó correctamente al usuario",null,5,()=>{
									this.router.navigate(['propuestas/admin/clients']);
								});
							}
							break;
						case 2:
							this.toast.openToast("Usuario incorrecto",null,5,null);
							break;
					}
				},
				(error) =>  {
					console.log(error)
				});
		}else{
			this.toast.openToast("Datos incompletos",null,5,null);
		}
	}

}