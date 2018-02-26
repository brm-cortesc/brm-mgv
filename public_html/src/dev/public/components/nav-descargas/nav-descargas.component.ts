import { Component, OnInit, HostListener, Inject} from '@angular/core';
import { Router} from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {WINDOW } from "../../../services/window.service";
declare let dataLayer: any;

@Component({
  selector: 'nav-descargas',
  templateUrl: './nav-descargas.component.html'
})
export class NavDesComponent implements OnInit {

  offset:number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
  	public router: Router

  	) { }

  ngOnInit() {

  }


}
