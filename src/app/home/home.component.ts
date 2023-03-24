import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  items: Observable<any[]>;
  downloadURL: Observable<string>;
  private itemDoc: AngularFirestoreDocument<any>;
  private itemsCollection: AngularFirestoreCollection<any>;
  pictures: any[] = []
  pics: any[] = [];
  path: string;


  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }


 

  ngOnInit(): void {
    this.path = "/src/assets/images/";

    this.items = this.firestore.collection('catalog2', ref => ref.where("orientation", "==", "landscape")).valueChanges();
    this.items.subscribe((data: any) => {
      this.pictures = data;
      this.generatePaths()
    })

  }


  goto(page) {
    this.router.navigate(['catalog'])
  }

  generatePaths() {

    this.pictures.forEach(picture => {
      const img = picture.imgPath;
      picture.imgPath = '../assets/images/' + img;
    });
  }


}
