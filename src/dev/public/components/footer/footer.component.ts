import { Component, OnInit, HostListener, Inject} from '@angular/core';
import { Router} from '@angular/router';
// import { DOCUMENT } from '@angular/platform-browser';
// import {WINDOW } from "../../services/window.service";

@Component({
  selector: 'footer-public',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor(
  	public router: Router
  	) { }

  ngOnInit() {

  }


}
