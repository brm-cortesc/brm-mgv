import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { RequestService } from '../../services/request/app.request';
import { Location } from "@angular/common";

@Component({
  templateUrl: './noticias.component.html'
})
export class NoticiasComponent implements OnInit {

	listaNoticias:boolean = true;
  noticias:any = [];
  noticia:any = [];
	noticiaUrl:any = [];

  constructor(
    private serviceRequest: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {

    this.noticiaUrl = this.route.snapshot.params['id'];

    if(this.noticiaUrl == undefined){
      this.router.navigate(['noticias']);
      this.listaNoticias = true;
    }else{
      
      this.listaNoticias = false;
    }

  	this.noticias = [
  		{
  			titulo:'Lorem Ipsum Dolor Samet',
  			url:'lorem-ipsum-dolor-samet',
  			fecha:'10/01/2018',
  			imgThumb:'noticias/sample-noticia.jpg',
  			imgBig:'noticias/noticia-big.jpg',
  			contenido: '<p><strong>Bucaramanga,&nbsp;21 de noviembre&nbsp;de 2017.-</strong>&nbsp;El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los pacientes.</p>'
  		},
      {
        titulo:'Ricardo',
        url:'ricardo',
        fecha:'10/01/2018',
        imgThumb:'noticias/sample-noticia.jpg',
        imgBig:'noticias/noticia-big.jpg',
        contenido: '<p>El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los <strong>pacientes</strong>.</p> <p>El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los <strong>pacientes</strong>.</p>'
      },
      {
        titulo:'Lorem 2',
        url:'lorem-2',
        fecha:'10/01/2018',
        imgThumb:'noticias/sample-noticia.jpg',
        imgBig:'noticias/noticia-big.jpg',
        contenido: '<p><strong>Bucaramanga,&nbsp;21 de noviembre&nbsp;de 2017.-</strong>&nbsp;El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los pacientes.</p>'
      },
      {
        titulo:'Lorem Ipsum Dolor Samet 2',
        url:'lorem-ipsum-dolor-samet-2',
        fecha:'10/01/2018',
        imgThumb:'noticias/sample-noticia.jpg',
        imgBig:'noticias/noticia-big.jpg',
        contenido: '<p><strong>Bucaramanga,&nbsp;21 de noviembre&nbsp;de 2017.-</strong>&nbsp;El programa de gobierno del candidato presidencial, Germán Vargas Lleras se enfoca en la transformación del sistema de salud, para que el ciudadano tenga un servicio de calidad y que cubra todas las necesidades de los pacientes.</p>'
      }
  	];
    

    //Filtro para mostrar la vista correspondiente
    let notTemp = this.noticias.filter((node)=>{return node.url == this.noticiaUrl });        
   
    if (notTemp.length > 0) {
      this.noticia = notTemp[0];
    }
    

  }

  ruta(url){
    this.listaNoticias = false;
    this.router.navigate(['noticias/'+ url]);

  }




}
