import { Component, OnInit, HostListener, Inject} from '@angular/core';
import { Router} from '@angular/router';
// import { DOCUMENT } from '@angular/platform-browser';
// import {WINDOW } from "../../services/window.service";
declare let dataLayer: any;

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

goToFb(){
    dataLayer.push({'Red-Social': 'Facebook', 'event': 'Clic-Redes-Sociales'});
  }

  goToTw(){
    dataLayer.push({'Red-Social': 'Twitter', 'event': 'Clic-Redes-Sociales'});
  }

  goToIg(){
    dataLayer.push({'Red-Social': 'Instagram', 'event': 'Clic-Redes-Sociales'});
  }

  goToYt(){
    dataLayer.push({'Red-Social': 'YouTube', 'event': 'Clic-Redes-Sociales'});
  }


}
