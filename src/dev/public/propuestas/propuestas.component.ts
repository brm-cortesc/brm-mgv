import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { RequestService } from '../../services/request/app.request';
import { Location } from "@angular/common";


@Component({
  templateUrl: './propuestas.component.html'
})
export class PropuestasComponent implements OnInit {

	listaPropuestas:boolean = true;
	propuestas:any = [];
	propuesta:any;
	propuestaSelUrl:any ="";
	email:string = "";
	errorEmail:boolean = false;


  constructor(
  	private serviceRequest: RequestService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private location: Location,
  	private sanitizer: DomSanitizer
  	) { }

 	ngOnInit() {
		this.propuestaSelUrl = this.route.snapshot.params['id'];

		if(this.propuestaSelUrl == undefined){
			this.router.navigate(['propuestas']);
			this.listaPropuestas = true;
		}

 		this.propuestas=[
	 		{
	 			nombre:'Salud',
	 			url:'salud',
	 			imgFondo: 'propuestas/bg-salud.jpg',
	 			imgBanner: 'propuestas/banner-salud.jpg',
	 			videoId: 'K35CenjmNXE',
	 			descVideo: 'Mejorar y equiparar el sistema de salud para todos los colombianos',
	 			pdf: 'salud.pdf',
	 			propuestaTxt: '<p><strong>Bucaramanga,&nbsp;21 de noviembre&nbsp;de 2017.-</strong>&nbsp;El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los pacientes.</p>'
	 		},

	 		{
	 			nombre:'Infraestructura',
	 			url:'infraestructura',
	 			imgFondo: 'propuestas/bg-salud.jpg',
	 			imgBanner: 'propuestas/banner-salud.jpg',
	 			videoId: 'K35CenjmNXE',
	 			descVideo: 'Mejorar y equiparar el sistema de salud para todos los colombianos',
	 			pdf: 'salud.pdf',
	 			propuestaTxt: '<p><strong>Bucaramanga,&nbsp;21 de noviembre&nbsp;de 2017.-</strong>&nbsp;El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los pacientes.</p>'
	 		}

 		];

 		this.propuestas.unshift({nombre:'Seleccionar'});
 		if (this.propuestaSelUrl != undefined) {
 			this.selUrl(this.propuestaSelUrl);
			this.listaPropuestas = false;

 		}


 	}


 	urlVideo(id){
		return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+id+"?rel=0&amp;showinfo=0");
	}


	verPdf(pdf){
		this.validEmail();
		if (!this.errorEmail) {
			this.serviceRequest.post('http://stagmejorvg.mejorvargaslleras2018.com/propuestas/app.php',{email:this.email,idPropuesta:this.propuesta.id,accion:"setDescarga"})
			.subscribe(
			(result) => {
				switch (result.error) {
					case 0:
						alert("Ocurrió un error");
						break;
					case 1:
						this.email = "";
						let link = document.createElement("a");
					    link.target = '_blank';
					    link.href = 'http://stagmejorvg.mejorvargaslleras2018.com/propuestas/assets/pdf/'+pdf;
					    document.body.appendChild(link);
					    link.click();
						break;
					case 2:
						alert("Ocurrió un error");
						break;
				}
			},
			(error) =>  {
				console.log(error)
			});	
		}

	}

	ruta(url){
		this.listaPropuestas = false;

		this.router.navigate(['propuestas/'+ url])

	}

	selPropuesta(e){
		let selectElement = e.target;
		var urlIndex = selectElement.selectedIndex;
		var url = selectElement.options[urlIndex].value;
		if (urlIndex != '0') {
			location.href = './propuestas/'+url;
			// this.router.navigate('')
		}

		//location.href = './'+url;
		/*this.router.navigate(["/",url]);
		this.selUrl(url);*/
	}

	selUrl(url){
		this.propuestaSelUrl = url;
		console.log(this.propuestaSelUrl);
		let proTemp = this.propuestas.filter((node)=>{
			return node.url==url;
		});
		if (proTemp.length > 0) {
			this.propuesta = proTemp[0];
		}
	}

	validEmail(){
		if (this.email != "" && this.validateEmail(this.email)) {
			this.errorEmail = false;
		}else{
			this.errorEmail = true;
		}
	}

	validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}


}