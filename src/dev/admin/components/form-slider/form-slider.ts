import { Component, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/app.request';
import { LoginAdminService } from '../../login/login.service';
import { AlertToastComponent } from '../../components/alert-toast/alert-toast';

@Component({
	selector: 'form-slider',
	templateUrl: './form-slider.html',
})
export class FormSliderComponent {
	@Input() idSlider;
	@Output() insertSlider = new EventEmitter();
	slider:any = [];
	activeS:boolean = false;
	fileImageBig: File;
	fileImageThumb: File;
	@ViewChild(AlertToastComponent) toast:AlertToastComponent;

	constructor(private serviceLoginAdmin: LoginAdminService,
		private route: ActivatedRoute,
		private serviceRequest: RequestService,
		private router: Router){
	}

	ngOnInit() {
		if (this.idSlider != null) {
			this.serviceRequest.post('app.php', { accion: 'getAdminSlider', idSlider: this.idSlider})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.slider = result.data;
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
			this.fileImageBig = fileList[0];
		}
	}

	fileChange2(event) {
		let fileList: FileList = event.target.files;
    	if(fileList.length > 0) {
			this.fileImageThumb = fileList[0];
		}
	}


	setSlider(){
		if (this.slider.titulo != undefined &&
		 this.slider.titulo != '' &&
			 ((this.slider.imgBig != undefined &&
			 this.slider.imgBig != '') || this.fileImageBig != undefined)
			&&
			 ((this.slider.imgThumb != undefined &&
			 this.slider.imgThumb != '') || this.fileImageThumb != undefined)) {
			let user = this.serviceLoginAdmin.getSession();
			
			let formData:FormData = new FormData();
			

			if (this.fileImageBig == undefined) {
				formData.append('imgBig', this.slider.imgBig);
			}else{
				formData.append('imgBig', this.fileImageBig, this.fileImageBig.name);
			}

			if (this.fileImageThumb == undefined) {
				formData.append('imgThumb', this.slider.imgThumb);
			}else{
				formData.append('imgThumb', this.fileImageThumb, this.fileImageThumb.name);
			}

			formData.append('id', this.idSlider);
			formData.append('titulo', this.slider.titulo);
			formData.append('url', this.slider.url);
			formData.append('orden', (this.slider.orden != undefined) ? this.slider.orden : null );
			formData.append('accion', 'setAdminSlider');

			this.serviceRequest.post('app.php', formData, true)
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							if (this.idSlider != null || this.idSlider == '') {
								this.toast.openToast("Actualizó correctamente el slider",null,5,null);
							}else{
								this.insertSlider.emit({id: result.data.id,
									titulo: this.slider.titulo,
									imgThumb: result.data.imgThumb});
							}

							if (this.idSlider == null || this.idSlider == '') {
								this.toast.openToast("Agregó correctamente el slider",null,3,()=>{
									this.router.navigate(['admin/sliders']);
								});
							}else{
								this.toast.openToast("Actualizó correctamente el slider",null,3,()=>{
									this.router.navigate(['admin/sliders']);
								});
							}
							break;
						case 2:
							this.toast.openToast("Los datos son incorrectos",null,5,null);
							break;
						case 3:
							this.toast.openToast("Los datos son incorrectos",null,5,null);
							break;
						case 5:
							this.toast.openToast("El nombre de la slider o la url ya existen",null,5,null);
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