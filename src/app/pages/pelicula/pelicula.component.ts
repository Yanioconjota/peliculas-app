import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieResponse;

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.peliculasService.getPelicula(id)
      .subscribe( movie => {
        console.log(movie);
        this.movie = movie;
      })
  }

  regresar() {
    this.location.back();
  }

}
