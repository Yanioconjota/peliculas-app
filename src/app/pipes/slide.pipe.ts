import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slide'
})
export class SlidePipe implements PipeTransform {

  transform(slide: string): string {
    //url(http://image.tmdb.org/t/p/w1920_and_h600_multi_faces

    if (slide) {
      return `url(http://image.tmdb.org/t/p/w1920_and_h600_multi_faces/${slide})`;
    } else {
      return 'url(./assets/img/no-image.jpg)';
    }
  }

}
