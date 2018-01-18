import { Component, OnInit} from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
     // @Inject(DOCUMENT) private document: Document,
    ) { }
  
	slides:any = [];
	noticiasR:any [];
  // estadito:boolean = false;
	slideConfig:any = {};
	public inscripcionForm: any = {};
  public formSubmitAttempt: boolean = false;

 	ngOnInit() {

 		//Slide items
 		this.slides = [
 		  {
         titulo: 'slide 1',
         imgBig: 'assets/images/slides/slide-01-big.jpg',
         imgThumb: 'assets/images/slides/slide-01-thumb.jpg',
         url: 'noticias/lorem-ipsum-dolor-samet'
      },
      {
         titulo: 'slide 2',
         imgBig: 'assets/images/slides/slide-01-big.jpg',
         imgThumb: 'assets/images/slides/slide-01-thumb.jpg',
         url: 'noticias/ricardo'
      }
 		
 		];

 		//configuracion de slider
 		this.slideConfig = {
 		  'slidesToShow': 1,
 		  'slidesToScroll': 1,
 		  'autoplay': false,
      // 'autoplaySpeed': 5000,
 		  'infinite': true,
 		  'mobileFirst': true,
 		  'dots':true,
 		  'arrows':false,
 		  'swipe':true
  		};

  	//Noticias recientes
  	this.noticiasR = [
  		{
  			img:'noticias/sample-noticia.jpg',
  			title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laborum cum iusto unde expedita labore, explicabo magni enim'
  		},
  		{
  			img:'noticias/sample-noticia.jpg',
  			title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laborum cum iusto unde expedita labore, explicabo magni enim'
  		},

  	]
	}

  // @HostBinding('class.isActive')isActive:boolean;

	save(inscripcion){
		this.formSubmitAttempt = true;
		// console.log(inscripcion);
	}

  focusIn(event){
    let el = event.srcElement;
    let parent = el.parentNode;     
    let valor = el.value


    if (el.tagName == 'SELECT'){
      parent.parentNode.classList.add('active')
    }else{

        parent.classList.add('active')
    }

  }

  focusOut(event){
    let el = event.srcElement;
    let parent = el.parentNode;     
    let valor = el.value;

    if (valor != '' ){
      if (el.tagName == 'SELECT'){
      parent.parentNode.classList.add('active')
      }else{

          parent.classList.add('active')
      }


    }else{
      if (el.tagName == 'SELECT'){
      parent.parentNode.classList.remove('active')
      }else{

          parent.classList.remove('active')
      }

    }
  }

}