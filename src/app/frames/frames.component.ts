import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent {

  constructor(
    private router:Router
  ) { }

  goto(page) {
    this.router.navigate(['catalog'])
  }


}
