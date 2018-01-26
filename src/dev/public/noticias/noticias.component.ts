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
  noticia:any = null;
	noticiaUrl:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private requestService:RequestService
    ) { }

  ngOnInit() {

    this.noticiaUrl = this.route.snapshot.params['id'];

    /* Trae de base de datos Servicio noticias */
    this.requestService.post('app.php',{accion:"getNoticias"})
    .subscribe(
    (result) => {
      //this.toast.closeLoader();
      switch (result.error) {
        case 0:
          console.log("Los datos son incorrectos");
          break;
        case 1:
          this.noticias = result.data;
          //Filtro para mostrar la vista correspondiente
          let notTemp = this.noticias.filter((node)=>{return node.url == this.noticiaUrl });        
          if (notTemp.length > 0) {
            this.noticia = notTemp[0];
          }else{
            this.router.navigate(['noticias']);
          }
          break;
      }
    },
    (error) =>  {
      //this.toast.closeLoader();
      console.log(error)
    });
  }

  ruta(url){
    this.listaNoticias = false;
    this.router.navigate(['noticias/'+ url]);
  }




}
