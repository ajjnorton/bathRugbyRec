import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-catalog',
  standalone: true,

  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule


  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {


  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;
  pictures: any[] = []
  players:any[]=[];
  filteredOptions: Observable<any[]>;
  options: any[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  myControl = new FormControl<string | any>('');

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.getCollection()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  goto(page) {
    this.router.navigate(['catalog'])
  }

  getCollection() {
    this.items = this.firestore.collection('catalog2', ref => ref.limit(200)).valueChanges();
    this.items.subscribe((data: any) => {
      this.pictures = data;
      console.log(data)
      console.log(data.length)
      const players = data.map(item=>item.player)
      this.players = this.removeDuplicates(players)
      console.log(this.players)
      this.getPictures()
    })
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  removeDuplicates(values) {
    return [...new Set(values)]
  }

  getPictures() {

    this.pictures.forEach(picture => {
      const img = picture.imgPath;
      const ref = this.storage.ref(img)
      return ref.getDownloadURL().subscribe(url => {

        picture.url = url
      })
    });
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }



}
