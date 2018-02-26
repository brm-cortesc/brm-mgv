import { Component, OnInit} from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser';
// import {WINDOW } from "../../services/window.service";

@Component({
  templateUrl: './boletin.component.html'
})
export class BoletinComponent implements OnInit {

	boletines:any = [];

  constructor() { }

  ngOnInit() {
  	this.boletines = [
  		{
  			id: 0,
  			titulo: 'Lorem boletin 1',
  			desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p>',
  			descarga: 'boletines/boletin.zip'
  		},
  		{
  			id: 1,
  			titulo: 'Lorem boletin 2',
  			desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p>',
  			descarga: 'boletines/boletin.zip'
  		},
  		{
  			id: 2,
  			titulo: 'Lorem boletin 3',
  			desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nihil, deserunt ex voluptatum. Tempore facilis incidunt, atque ullam soluta quam provident excepturi perspiciatis totam? Sit, ipsa saepe molestiae nesciunt ducimus.</p>',
  			descarga: 'boletines/boletin.zip'
  		}
  	]


   }


}
