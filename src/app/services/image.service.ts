import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  getImagesURL(image) {
    // Assuming Google always use a JPEG extension
    // We need to replace JPG with JPEG

  
    //const replaced = image.name.replace(/.jpg/, '.jpeg')

    const ref = this.storage.ref(image)
    return ref.getDownloadURL().subscribe
  }
}
