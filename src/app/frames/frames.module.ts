import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FramesRoutingModule } from './frames-routing.module';
import { FramesComponent } from './frames.component';


@NgModule({
  declarations: [
    FramesComponent
  ],
  imports: [
    CommonModule,
    FramesRoutingModule
  ]
})
export class FramesModule { }
