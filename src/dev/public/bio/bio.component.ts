import { Component, OnInit} from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser';
// import {WINDOW } from "../../services/window.service";
import { RequestService } from '../../services/request/app.request';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  templateUrl: './bio.component.html'
})
export class BioComponent implements OnInit {

  biografia:any = null;
  constructor(
    private requestService:RequestService,
    private meta: Meta, 
    private title: Title
	) { 
    meta.addTags([
      { name: 'description', content: 'Biografía, conozca la vida del candidato a la presidencia de Colombia Germán Vargas Lleras, y porqué es la mejor opción para el país.' }
    ]);
  }

  ngOnInit() { 
  	/* Trae de base de datos Servicio biografia */
    this.requestService.post('app.php',{accion:"getBiografia"})
    .subscribe(
    (result) => {
      //this.toast.closeLoader();
      switch (result.error) {
        case 0:
          console.log("Los datos son incorrectos");
          break;
        case 1:
          this.biografia = result.data;
          break;
      }
    },
    (error) =>  {
      //this.toast.closeLoader();
      console.log(error)
    });
  }


}
