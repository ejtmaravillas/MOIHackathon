import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, FilesystemDirectory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    })
  }

  async checkFileExists(filepath: string): Promise<boolean> {
    try {
      const result = await Filesystem.stat({
        path: filepath,
        directory: Directory.Data
      });
      return !!result;
    } catch (error) {
      // If an error occurs, it means the file doesn't exist
      return false;
    }
  }

  public async loadSaved() {
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    console.log(value);
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

    if (!this.platform.is('hybrid')) {
      for (let photo of this.photos) {
        const fileExists = await this.checkFileExists(photo.filepath);
        if (fileExists) {
          const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
        }
        else {
          this.photos = this.photos.filter(p => p !== photo);
        }
      }
    }
    console.log('value',value);
    console.log('photos',this.photos);
  }

  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      }
    }
    else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      }
    }
    // return {
    //   filepath: fileName,
    //   webviewPath: photo.webPath
    // }
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    }
    else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobtoBase64(blob) as string;
    }
    // // Fetch the photo, read as a blob, then convert to base64 format
    // const response = await fetch(photo.webPath!);
    // const blob = await response.blob();

    // return await this.convertBlobtoBase64(blob) as string;
  }

  private convertBlobtoBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}