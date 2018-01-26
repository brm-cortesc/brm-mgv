import { Component, OnInit} from '@angular/core';
import { RequestService } from "../../services/request/app.request";
import { Router, ActivatedRoute} from '@angular/router';
// import { DOCUMENT } from '@angular/platform-browser';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private requestService:RequestService,
    // @Inject(DOCUMENT) private document: Document,
    ) { }
  
	slides:any = [];
	noticiasR:any [];
  // estadito:boolean = false;
	slideConfig:any = {};
	public inscripcionForm: any = {};
  public formSubmitAttempt: boolean = false;
  public departamentos: any;
  public ciudades: any;
  public msg:any = false;
 	ngOnInit() {

    // Trae de base de datos
    this.requestService.post('app.php',{accion:"getHome"})
    .subscribe(
    (result) => {
      //this.toast.closeLoader();
      /* Error general */
      switch (result.error) {
        case 0:
          console.log("Datos incorrectos");
          break;
      }
      /* Datos Slider */
      switch (result.error.slider) {
        case 1:
          this.slides = result.data.slider;
          console.log("Datos de slider",result.data.slider);
          break;
        case 2:
          console.log("No hay datos disponibles slider");
          break;
        default:
          console.log("Ocurrió un error");
          break;
      }
      /* Datos Noticias */
      switch (result.error.noticias) {
        case 1:
          this.noticiasR = result.data.noticias;
          console.log("Datos de noticias",result.data.noticias);
          break;
        case 2:
          console.log("No hay datos disponibles noticias");
          break;
        default:
          console.log("Ocurrió un error");
          break;
      }

      /* Datos departamentos */
      switch (result.error.departamentos) {
        case 1:
          this.departamentos = result.data.departamentos;
          this.departamentos.unshift({id:'',nombre:''});
          console.log("Datos de departamentos",result.data.departamentos);
          break;
        case 2:
          console.log("No hay datos disponibles departamentos");
          break;
        default:
          console.log("Ocurrió un error");
          break;
      }
    },
    (error) =>  {
      //this.toast.closeLoader();
      console.log(error)
    });
 
/*    this.slides = [
       {
         titulo: 'slide 1',
         imgBig: 'slide-01-big.jpg',
         imgThumb: 'slide-01-thumb.jpg',
         url: 'noticias/lorem-ipsum-dolor-samet'
      },
      {
         titulo: 'slide 2',
         imgBig: 'slide-01-big.jpg',
         imgThumb: 'slide-01-thumb.jpg',
         url: 'noticias/ricardo'
      }
     
     ];*/

 		//configuracion de slider
 		this.slideConfig = {
 		  'slidesToShow': 1,
 		  'slidesToScroll': 1,
 		  'autoplay': false,
      // 'autoplaySpeed': 5000,
 		  'infinite': true,
 		  'mobileFirst': true,
 		  'dots':true,
 		  'arrows':false,
 		  'swipe':true
  		};

	}

  // @HostBinding('class.isActive')isActive:boolean;

	save(inscripcion){
		this.formSubmitAttempt = true;
    if (inscripcion.form.valid) {
      this.inscripcionForm.accion = "setRegistro";
      // Inserta un nuevo registro
      this.requestService.post('app.php', this.inscripcionForm)
      .subscribe(
      (result) => {
        //this.toast.closeLoader();
        switch (result.error) {
          case 0:
            console.log("Los datos son incorrectos");
            break;
          case 1:
             this.formSubmitAttempt = false;
              inscripcion.reset();
              this.msg = true;
              this.inscripcionForm = {};
              setTimeout(()=>{
                this.msg = false;
              },3000);
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


    if (el.tagName == 'SELECT'){
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
      if (el.tagName == 'SELECT'){
      parent.parentNode.classList.add('active')
      }else{

          parent.classList.add('active')
      }


    }else{
      if (el.tagName == 'SELECT'){
      parent.parentNode.classList.remove('active')
      }else{

          parent.classList.remove('active')
      }

    }
  }

  ruta(url){
    this.router.navigate(['noticias/'+ url]);
  }

  testAdmin(){
    this.router.navigate(['admin']);
  }

}