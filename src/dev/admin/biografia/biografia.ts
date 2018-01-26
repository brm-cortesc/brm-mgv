import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request/app.request';
import { LoginAdminService } from '../login/login.service';
import { AlertToastComponent } from '../components/alert-toast/alert-toast';

@Component({
  templateUrl: './biografia.html',
  providers: [LoginAdminService]
})

export class AdminBiografia {
	public biografiaForm: any = {};
  	public formSubmitAttempt: boolean = false;
	@ViewChild(AlertToastComponent) toast:AlertToastComponent;
	
	constructor(private serviceLoginAdmin: LoginAdminService,
		private route: ActivatedRoute,
		private requestService: RequestService,
		private router: Router) { }

	ngOnInit() {
		if (!this.serviceLoginAdmin.validateSession()) {
			this.router.navigate(['admin']);
		}else{
			this.requestService.post('app.php', { accion: 'getBiografia'})
				.subscribe(
				(result) => {
					switch (result.error) {
						case 0:
							this.toast.openToast("Ocurrió un error",null,5,null);
							break;
						case 1:
							this.biografiaForm = result.data;
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

  save(biografia){
    this.formSubmitAttempt = true;
    if (biografia.form.valid) {
      this.biografiaForm.accion = "setBiografia";
      // Inserta un nuevo contacto
      this.requestService.post('app.php', this.biografiaForm)
      .subscribe(
      (result) => {
        //this.toast.closeLoader();
        switch (result.error) {
          case 0:
            console.log("Los datos son incorrectos");
            break;
          case 1:
             console.log("Se insertó correctqmente");
            break;
        }
      },
      (error) =>  {
        //this.toast.closeLoader();
        console.log(error)
      });
    }
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
