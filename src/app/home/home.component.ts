import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageService } from '../services/image.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private storage: AngularFireStorage,
    private imageService: ImageService,
    private router: Router
  ) { }




  ngOnInit(): void {
    //this.path = "/src/assets/images/";

    this.items = this.firestore.collection('catalog2', ref => ref.where("orientation", "==", "landscape")).valueChanges();
    this.items.subscribe((data: any) => {
      this.pictures = data;
      console.log(data)
      console.log(data.length)
      this.getPictures()
    })

  }


  goto(page) {
    this.router.navigate(['catalog'])
  }

  getPictures() {

    this.pictures.forEach(picture => {
      const img = picture.imgPath;
      const ref = this.storage.ref(img)
      return ref.getDownloadURL().subscribe(url => {
        console.log(url)
        picture.url=url
      })
    });
  }


}
