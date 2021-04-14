import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';
import { SlidePipe } from './slide.pipe';



@NgModule({
  declarations: [PosterPipe, SlidePipe],
  exports: [
    PosterPipe,
    SlidePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
