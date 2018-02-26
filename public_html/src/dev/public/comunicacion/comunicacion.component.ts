import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { RequestService } from '../../services/request/app.request';
import { Location } from "@angular/common";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './comunicacion.component.html'
})
export class ComunicacionComponent implements OnInit {


  comunicaciones:any = [];
  comunicacion:any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private requestService:RequestService,
    private meta: Meta,
    private title: Title
    ) { 
      meta.addTags([
        { name: 'description', content: 'Últimas noticias del candidato a la presidencia de Colombia Germán Vargas Lleras, su campaña y sus propuestas de gobierno.' }
      ]);
  }

  ngOnInit() {

    this.comunicaciones = [
      {
        nombre: 'Kit 1',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        imgFondo: 'bg-demo.jpg',
        url: 'bg-demo.jpg'        
      },
      {
        nombre: 'Kit 2',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        imgFondo: 'bg-demo.jpg',
        url: 'bg-demo.jpg'        
      },
      {
        nombre: 'Kit 3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        imgFondo: 'bg-demo.jpg',
        url: 'bg-demo.jpg'        
      },
      {
        nombre: 'Kit 4',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        imgFondo: 'bg-demo.jpg',
        url: 'bg-demo.jpg'        
      }
     
     ]

  }

  // ruta(url){
  //   this.listaNoticias = false;
  //   this.router.navigate(['noticias/'+ url]);
  // }




}
