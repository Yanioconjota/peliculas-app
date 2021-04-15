import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Cast } from 'src/app/interfaces/credits-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieResponse;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.peliculasService.getPelicula(id)
      .subscribe( movie => {
        console.log(movie);
        this.movie = movie;
      });
    this.peliculasService.getCast(id)
      .subscribe( cast => {
        this.cast = cast;
        console.log(cast);
      })
  }

  regresar() {
    this.location.back();
  }

}
