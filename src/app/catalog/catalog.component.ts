import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit{


  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;
  pictures: any[] = []

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.getCollection()
  }

  goto(page) {
    this.router.navigate(['catalog'])
  }

  getCollection() {
    this.items = this.firestore.collection('catalog2').valueChanges();
    this.items.subscribe((data: any) => {
      this.pictures = data;
      console.log(data)
      console.log(data.length)
      this.getPictures()
    })
  }



  getPictures() {

    this.pictures.forEach(picture => {
      const img = picture.imgPath;
      const ref = this.storage.ref(img)
      return ref.getDownloadURL().subscribe(url => {
    
        picture.url=url
      })
    });
  }



}
