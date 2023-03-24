import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FramesComponent } from './frames.component';

const routes: Routes = [
  {path:'', component:FramesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramesRoutingModule { }
