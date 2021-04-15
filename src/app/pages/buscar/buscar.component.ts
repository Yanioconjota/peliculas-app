import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  public textoBusqueda: string;
  public movies: Movie[];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.peliculasService.cargando) { return; }

      this.peliculasService.buscarPeliculas(this.textoBusqueda)
        .subscribe(movies => {
          this.movies.push(...movies);
          console.log(this.movies)
        })
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.peliculasService.buscarPeliculas(params.texto)
        .subscribe( movies => {
          this.textoBusqueda = params.texto;
          this.movies = movies;
          console.log('películas entontradas en búsqueda de:', params.texto,movies);
        })
    })
  }

}
