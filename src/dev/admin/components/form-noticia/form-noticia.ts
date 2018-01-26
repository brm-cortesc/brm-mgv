import { Component, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/app.request';
import { LoginAdminService } from '../../login/login.service';
import { AlertToastComponent } from '../../components/alert-toast/alert-toast';

@Component({
	selector: 'form-noticia',
	templateUrl: './form-noticia.html',
})
export class FormNoticiaComponent {
	@Input() idNoticia;
	@Output() insertNoticia = new EventEmitter();
	noticia:any = [];
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
		if (this.idNoticia != null) {
			this.serviceRequest.post('app.php', { accion: 'getAdminNoticia', idNoticia: this.idNoticia})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.noticia = result.data;
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


	setNoticia(){
		if (this.noticia.titulo != undefined &&
		 this.noticia.titulo != '' &&
		 this.noticia.url != undefined &&
		 this.noticia.url != '' &&
		 this.noticia.contenido != undefined &&
		 this.noticia.contenido 
			&&
			 ((this.noticia.imgBig != undefined &&
			 this.noticia.imgBig != '') || this.fileImageBig != undefined)
			&&
			 ((this.noticia.imgThumb != undefined &&
			 this.noticia.imgThumb != '') || this.fileImageThumb != undefined)) {
			let user = this.serviceLoginAdmin.getSession();
			
			let formData:FormData = new FormData();
			

			if (this.fileImageBig == undefined) {
				formData.append('imgBig', this.noticia.imgBig);
			}else{
				formData.append('imgBig', this.fileImageBig, this.fileImageBig.name);
			}

			if (this.fileImageThumb == undefined) {
				formData.append('imgThumb', this.noticia.imgThumb);
			}else{
				formData.append('imgThumb', this.fileImageThumb, this.fileImageThumb.name);
			}


			//formData.append('categorias', JSON.stringify(categoriasActivas));
			
			formData.append('id', this.idNoticia);
			formData.append('titulo', this.noticia.titulo);
			formData.append('url', this.noticia.url);
			formData.append('destacado', (this.noticia.destacado != undefined) ? this.noticia.destacado : null );
			formData.append('contenido', this.noticia.contenido);
			formData.append('accion', 'setAdminNoticia');

			this.serviceRequest.post('app.php', formData, true)
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:

							if (this.idNoticia != null || this.idNoticia == '') {
								this.toast.openToast("Actualizó correctamente la noticia",null,5,null);
							}else{
								this.insertNoticia.emit({id: result.data.id,
									titulo: this.noticia.titulo,
									imgThumb: result.data.imgThumb});
							}
							break;
						case 2:
							this.toast.openToast("Los datos son incorrectos",null,5,null);
							break;
						case 3:
							this.toast.openToast("Los datos son incorrectos",null,5,null);
							break;
						case 5:
							this.toast.openToast("El nombre de la noticia o la url ya existen",null,5,null);
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