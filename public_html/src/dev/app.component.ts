import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'mgv';

  private lastPoppedUrl: string;
	private yScrollStack: number[] = [];

  constructor(private router: Router, private location: Location){}

  ngOnInit() {

  		// devolvemos al top la aplicacion cada vez que se cambia la ruta
      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
      this.router.events.subscribe((ev:any) => {
          if (ev instanceof NavigationStart) {
              if (ev.url != this.lastPoppedUrl)
                  this.yScrollStack.push(window.scrollY);
          } else if (ev instanceof NavigationEnd) {
              if (ev.url == this.lastPoppedUrl) {
                  this.lastPoppedUrl = undefined;
                  window.scrollTo(0, this.yScrollStack.pop());
              } else
                  window.scrollTo(0, 0);
          }
      });
  }

  
}