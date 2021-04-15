import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;
  private queryParams: {};

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '149b27291a08cc92394a34cfaa4b84b1',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
      include_adult: 'true'
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]> {

    console.log('Cargando API');

    return this.armarQuery('movie/now_playing');
  }

  buscarPeliculas(texto: string):Observable<Movie[]> {
    const params = {
      ...this.params,
      query: texto
    };

    return this.armarQuery('search/movie', params, texto);
  }

  getPelicula(id:string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,
      { params: this.params })
  }

  armarQuery(queryString: string, params?: {}, texto?: string) {
    if (this.cargando) {
      //Devuelve un observable del tipo array de movie
      return of([]);
    }

    this.cargando = true;

    if (!params) {
      this.queryParams = this.params;
    } else {
      this.queryParams = params;
    }

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/${queryString}`,
      { params: this.queryParams })
      .pipe(
        map(resp => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      )
  }
}
///movie/now_playing