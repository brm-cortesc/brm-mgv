import { Component, OnInit} from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser';
// import {WINDOW } from "../../services/window.service";
import { RequestService } from '../../services/request/app.request';

@Component({
  templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit {

	public contactoForm: any = {};
  public formSubmitAttempt: boolean = false;
  public departamentos: any;
  public ciudades: any;

  constructor(
    private requestService:RequestService
    ) {}

  ngOnInit() {
    
    /* Trae de base de datos Servicio noticias */
    this.requestService.post('app.php',{accion:"getDepartamentos"})
    .subscribe(
    (result) => {
      //this.toast.closeLoader();
      switch (result.error) {
        case 0:
          console.log("Los datos son incorrectos");
          break;
        case 1:
          this.departamentos = result.data;
          this.departamentos.unshift({id:'',nombre:''});
          break;
      }
    },
    (error) =>  {
      //this.toast.closeLoader();
      console.log(error)
    });
  }

  save(contacto){
    this.formSubmitAttempt = true;
    if (contacto.form.valid) {
      this.contactoForm.accion = "setContacto";
      // Inserta un nuevo contacto
      this.requestService.post('app.php', this.contactoForm)
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

  getCiudades(e,update:any = false){
      var idDepartamento;
    if (update) {
      idDepartamento = e;
    }else{
      let selectElement = e.target;
      var stateIndex = selectElement.selectedIndex;
      idDepartamento = selectElement.options[stateIndex].value;
    }
    // Trae las ciudades de la bd
    this.requestService.post('app.php',{accion:"getCiudades",idDepartamento:idDepartamento})
      .subscribe(
      (result) => {
        //this.toast.closeLoader();
        switch (result.error) {
          case 0:
            //this.toast.openToast("Ocurrió un error",null,5,null);
            break;
          case 1:
            this.ciudades = result.data;
            this.ciudades.unshift({id:'',name:''});
            break;
        }
      },
      (error) =>  {
        //this.toast.closeLoader();
        console.log(error)
      });
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
