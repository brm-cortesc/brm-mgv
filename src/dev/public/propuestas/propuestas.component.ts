import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser'
import { RequestService } from '../../services/request/app.request';
import { WindowRef } from '../../services/windowObj.service';
import { Location } from "@angular/common";
import { Meta, Title } from '@angular/platform-browser';
declare let dataLayer: any;


@Component({
  templateUrl: './propuestas.component.html'
})
export class PropuestasComponent implements OnInit {

	propuestas:any = [];
	propuesta:any = null;
	propuestaSelUrl:any;
	email:string = "";
	errorEmail:boolean = false;


  constructor(
  	@Inject(DOCUMENT) private document: Document,
  	private requestService: RequestService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private location: Location,
  	private sanitizer: DomSanitizer,
  	private winRef: WindowRef,
    private meta: Meta, 
    private title: Title
  	) { 
		meta.addTags([
			{ name: 'description', content: 'Propuestas, conozca la propuesta del candidato a la presidencia de Colombia Germán Vargas Lleras, y porqué es la mejor opción para el país.' }
		]);
  	}

 	ngOnInit() {
		this.propuestaSelUrl = this.route.snapshot.params['id'];
		//console.log(this.propuestaSelUrl);
		/* Trae de base de datos Servicio noticias */
	    this.requestService.post('app.php',{accion:"getPropuestas"})
	    .subscribe(
	    (result) => {
	      //this.toast.closeLoader();
	      switch (result.error) {
	        case 0:
	          console.log("Los datos son incorrectos");
	          break;
	        case 1:
				this.propuestas = result.data;
				this.propuestas.unshift({nombre:'Seleccionar'});
				if (this.propuestaSelUrl != undefined) {
					this.selUrl(this.propuestaSelUrl);
					//Filtro para mostrar la vista correspondiente
					let notTemp = this.propuestas.filter((node)=>{return node.url == this.propuestaSelUrl });        
					if (notTemp.length > 0) {
						this.propuesta = notTemp[0];
						this.propuesta.videoUrl = this.urlVideo(this.propuesta.videoId);
					}else{
						this.router.navigate(['propuestas']);
					}

				}
				
				break;
	      }
	    },
	    (error) =>  {
	      //this.toast.closeLoader();
	      console.log(error)
	    });

 	}


 	urlVideo(id){
		return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+id+"?rel=0&amp;showinfo=0");
	}


	verPdf(pdf){
		this.validEmail();
		if (!this.errorEmail) {
			this.requestService.post('app.php',{email:this.email,idPropuesta:this.propuesta.id,accion:"setDescarga"})
			.subscribe(
			(result) => {
				switch (result.error) {
					case 0:
						alert("Ocurrió un error");
						break;
					case 1:
						dataLayer.push({ 'event': 'Descarga-PDF'});
						this.email = "";
						let filePdf = 'https://www.mejorvargaslleras.com/assets/pdf/'+pdf;
						this.saveToDisk(filePdf, pdf);
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

	saveToDisk(fileDownload, fileName){
		var a = document.createElement('a');
		a.href = fileDownload;
		a.target = '_parent';
		// Use a.download if available, it prevents plugins from opening.
		if ('download' in a) {
			a.download = fileName;
		}
		// Add a to the doc for click to work.
		(document.body || document.documentElement).appendChild(a);
		if (a.click) {
			a.click(); // The click method is supported by most browsers.
		} else {
			//$(a).click(); // Backup using jquery
		}
		// Delete the temporary link.
		a.parentNode.removeChild(a);
		return true;
	}
	



	ruta(url){
		this.router.navigate(['propuestas/'+ url])
	}

	selPropuesta(e){
		let selectElement = e.target;
		var urlIndex = selectElement.selectedIndex;
		var url = selectElement.options[urlIndex].value;
		if (urlIndex != '0') {
			location.href = '/propuestas/'+url;
			// this.router.navigate('')
		}

		//location.href = './'+url;
		/*this.router.navigate(["/",url]);
		this.selUrl(url);*/
	}

	selUrl(url){
		this.propuestaSelUrl = url;
		//console.log(this.propuestaSelUrl);
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