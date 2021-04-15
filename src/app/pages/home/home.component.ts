import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.peliculasService.cargando) { return; }

      this.peliculasService.getCartelera()
        .subscribe(movies => {
          this.movies.push(...movies);
          console.log(this.movies)
        })
    }
    //console.log({pos,max});
    
  }

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasService.resetCarteleraPage();
    this.peliculasService.getCartelera()
      .subscribe( movies => {
        this.movies = movies;
        console.log(movies)
        this.moviesSlideshow = movies;
      })
  }


  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }
}
