import { Component, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/app.request';
import { LoginAdminService } from '../../login/login.service';
import { AlertToastComponent } from '../../components/alert-toast/alert-toast';

@Component({
	selector: 'form-propuesta',
	templateUrl: './form-propuesta.html',
})
export class FormPropuestaComponent {
	@Input() idPropuesta;
	@Output() insertPropuesta = new EventEmitter();
	propuest:any = [];
	activeS:boolean = false;
	fileImage: File;
	fileFondo: File;
	filePdf: File;
	@ViewChild(AlertToastComponent) toast:AlertToastComponent;

	constructor(private serviceLoginAdmin: LoginAdminService,
		private route: ActivatedRoute,
		private serviceRequest: RequestService,
		private router: Router){
	}

	ngOnInit() {
		if (this.idPropuesta != null) {
			this.serviceRequest.post('app.php', { accion: 'getAdminPropuestas', idCuenta: this.idPropuesta})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.propuest = result.data;
							break;
						case 2:
							this.toast.openToast("Cliente incorrecto",null,5,null);
							break;
					}
				},
				(error) =>  {
					console.log(error)
				});
		}
	}

	fileChange(event) {

		let fileList: FileList = event.target.files;
    	if(fileList.length > 0) {
			this.fileImage = fileList[0];
		}
	}

	fileChange2(event) {

		let fileList: FileList = event.target.files;
    	if(fileList.length > 0) {
			this.filePdf = fileList[0];
		}
	}

	fileChange3(event) {

		let fileList: FileList = event.target.files;
    	if(fileList.length > 0) {
			this.fileFondo = fileList[0];
		}
	}


	setPropuesta(){
		if (this.propuest.nombre != undefined &&
		 this.propuest.nombre != '' &&
		 this.propuest.url != undefined &&
		 this.propuest.url != '' &&
		 this.propuest.videoId != undefined &&
		 this.propuest.videoId != '' &&
		 this.propuest.descVideo != undefined &&
		 this.propuest.descVideo &&
		 this.propuest.propuestaTxt != undefined &&
		 this.propuest.propuestaTxt 
			&&
			 ((this.propuest.imgBanner != undefined &&
			 this.propuest.imgBanner != '') || this.fileImage != undefined)
			&&
			 ((this.propuest.imgFondo != undefined &&
			 this.propuest.imgFondo != '') || this.fileFondo != undefined)
			&&
			 ((this.propuest.pdf != undefined &&
			 this.propuest.pdf != '') || this.filePdf != undefined)) {
			let user = this.serviceLoginAdmin.getSession();
			
			let formData:FormData = new FormData();
			

			if (this.fileImage == undefined) {
				formData.append('imgBanner', this.propuest.imgBanner);
			}else{
				formData.append('imgBanner', this.fileImage, this.fileImage.name);
			}

			if (this.fileFondo == undefined) {
				formData.append('imgFondo', this.propuest.imgFondo);
			}else{
				formData.append('imgFondo', this.fileFondo, this.fileFondo.name);
			}

			if (this.filePdf == undefined) {
				formData.append('pdf', this.propuest.pdf);
			}else{
				formData.append('pdf', this.filePdf, this.filePdf.name);
			}

			//formData.append('categorias', JSON.stringify(categoriasActivas));
			
			formData.append('idCuenta', this.idPropuesta);
			formData.append('nombre', this.propuest.nombre);
			formData.append('url', this.propuest.url);
			formData.append('videoId', this.propuest.videoId);
			formData.append('descVideo', this.propuest.descVideo);
			formData.append('propuestaTxt', this.propuest.propuestaTxt);
			formData.append('accion', 'setAdminPropuesta');

			this.serviceRequest.post('app.php', formData, true)
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							if (this.idPropuesta != null || this.idPropuesta == '') {
								this.toast.openToast("Actualizó correctamente la propuesta",null,5,null);
							}else{
								console.log("2");
								this.insertPropuesta.emit({id: result.data.id,
									nombre: this.propuest.nombre});
							}
							break;
						case 2:
							this.toast.openToast("Los datos son incorrectos",null,5,null);
							break;
						case 3:
							this.toast.openToast("Los datos son incorrectos",null,5,null);
							break;
						case 5:
							this.toast.openToast("El nombre de  la propuesta o la url ya existen",null,5,null);
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

	toggleClass(){
      this.activeS = !this.activeS;
  	}

  focusIn(event){
    let el = event.srcElement;
    let parent = el.parentNode;     
    let valor = el.value


    if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
      parent.parentNode.classList.add('active')
    }else{

        parent.classList.add('active')
    }

  }

  focusOut(event){
    let el = event.srcElement;
    let parent = el.parentNode;     
    let valor = el.value;

    if (valor != '' ){
      if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
      parent.parentNode.classList.add('active')
      }else{

          parent.classList.add('active')
      }


    }else{
      if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
      parent.parentNode.classList.remove('active')
      }else{

          parent.classList.remove('active')
      }

    }
  }


}