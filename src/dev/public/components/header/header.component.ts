import { Component, OnInit, HostListener, Inject} from '@angular/core';
import { Router} from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {WINDOW } from "../../../services/window.service";

@Component({
  selector: 'header-public',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	headerFixed:boolean = false;
  menuState:boolean = false;
  offset:number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
  	public router: Router

  	) { }

  ngOnInit() {

  }

  toggleMenu(){
    let ancho = this.window.screen.width;

    this.offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.menuState = !this.menuState;

    if (ancho < 768){
      this.document.body.classList.toggle('body-fixed');
     }

    // if (this.offset > 150) {
    //   this.document.getElementsByTagName('header')[0].classList.toggle('affix')

    // } else if (this.headerFixed && this.offset < 10) {
      
    //   this.document.getElementsByTagName('header')[0].classList.toggle('affix')

    // }

  };

  // @HostListener("window:scroll", [])

  // onScroll(){

  //   this.offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
  //       if (this.offset > 150) {
  //         this.headerFixed = true;
  //       } else if (this.headerFixed && this.offset < 10) {
  //         this.headerFixed = false;
  //       }
  // };


}
