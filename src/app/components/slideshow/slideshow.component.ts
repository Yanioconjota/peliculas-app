import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  public swiper: Swiper;

  constructor() { }

  ngOnInit(): void {
    console.log('Estas son las películas que me llegan mediante el decorador @Input', this.movies)
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  onSlidePrev(){
    this.swiper.slidePrev();
  }

  onSlideNext(){
    this.swiper.slideNext();
  }


}
