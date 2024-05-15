import { ChangeDetectorRef, Component, OnInit, enableProdMode } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonAvatar,
  IonToolbar,
  IonProgressBar,
  IonFabButton,
  IonFab,
  IonImg,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  call,
  document,
  film,
  cashOutline,
  settings,
  settingsOutline,
  menu,
  star,
  airplane,
  trophy,
  home,
  car,
  copy,
  phonePortrait,
  paperPlane,
  camera
} from 'ionicons/icons';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

interface LatLng {
  longitude: number,
  latitude: number
}
@Component({
  selector: 'app-podreport',
  templateUrl: './podreport.page.html',
  styleUrls: ['./podreport.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonItem,
    IonAvatar,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar,
    CurrencyPipe,
    DatePipe,
    IonFabButton,
    IonFab,
    IonImg,
    IonList,
    IonSelect,
    IonSelectOption,
  ],
})
export class PODReportPage implements OnInit {

  map!: L.Map;

  public progTotal = 10;
  public latitude = 24.466667;
  public longitude = 54.366669;
  private marker: any;
  public report: string = 'none';
  maplatlng: LatLng[] = [];
  public locIcon = L.icon({
    iconUrl: "../../assets/icon/loc.png",
    iconSize: [32, 40],
    iconAnchor: [16, 40]
  })
  constructor (
    private router: Router,
    private alertController: AlertController,
    public photoService: PhotoService,
    private cdr: ChangeDetectorRef) {
    addIcons({
      cashOutline,
      film,
      calendarOutline,
      settingsOutline,
      settings,
      call,
      document,
      menu,
      star,
      airplane,
      trophy,
      home,
      car,
      copy,
      phonePortrait,
      paperPlane,
      camera
    })
  }

  async ngOnInit() {
    this.getCurrentLocation();
    this.initializeMap();
  }

  backPage() {
    this.leave();
  }

  async leave() {
    if (true) {
      const confirmation = await this.leaveAlert(this.report, this.longitude, this.latitude, JSON.stringify(this.photoService.photos));
      if (!confirmation) return ;
    }
  }
  async leaveAlert(reportType: string, lng: number, lat: number, photos: string) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm Leave',
        message: 'Do you want to leave without submitting?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes',
            role: 'okay',
            handler: () => {
              for (let photo of this.photoService.photos) {
                this.deletePhoto(photo);
              }
              if (this.marker) {
                this.map.removeLayer(this.marker);
              }
              this.router.navigate(['/game']);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async submitReport() {
    console.log('Report: '+this.report);
    console.log('Photos: '+JSON.stringify(this.photoService.photos));
    console.log('Location: '+this.longitude, this.latitude);
    if (true) {
      const confirmation = await this.submitAlert(this.report, this.longitude, this.latitude, JSON.stringify(this.photoService.photos));
      if (!confirmation) return ;
    }
  }

  async getCurrentLocation() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus?.location != 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location != 'granted') {
          return ;
        }
      }
      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 1000,
        enableHighAccuracy: true
      };
      const position = await Geolocation.getCurrentPosition(options);
      if (position) {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      }
      this.drawMapMarker();
    }
    catch (e) {
      this.getLocationAlert('GPS unavailable');
      this.drawMapMarker();
    }
  }

  async getLocationAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Sorry',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Okay',
          role: 'okay'
        }
      ]
    });
    await alert.present();
  }

  async submitAlert(reportType: string, lng: number, lat: number, photos: string) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm Submit',
        message: 'Are these details correct? Report Type: '+reportType+' Location lat: '+lat+' Location lng: '+lng+' photos: '+photos+'<br\>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            }
          },
          {
            text: 'Submit',
            role: 'okay',
            handler: () => {
              return resolve(false);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async testAlert(lng: number, lat: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'lng: '+lng+' | lat: '+lat,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          role: 'okay'
        }
      ]
    });
    await alert.present();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async checkFileExists(filepath: string): Promise<boolean> {
    try {
      const result = await Filesystem.stat({
        path: filepath,
        directory: Directory.Data
      });
      return !!result;
    } catch (error) {
      return false;
    }
  }

  async confirmDelete(photo: UserPhoto) {
    const filepath = photo.filepath;
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delele?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            this.deletePhoto(photo);
          }
        }
      ]
    });
    await alert.present();
  }

  async deletePhoto(photo: UserPhoto) {
    try {
      const fileExists = await this.checkFileExists(photo.filepath);
      if (!fileExists) {
        this.photoService.photos = this.photoService.photos.filter(p => p !== photo);
      }
      else
      {
        await Filesystem.deleteFile({
          path: photo.filepath,
          directory: Directory.Data
        });
        this.photoService.photos = this.photoService.photos.filter(p => p !== photo);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  handleChange(e: any) {
    this.report = e.detail.value;
  }
  handleCancel() {
    this.report = 'none';
  }

  onMapClick(event: any) {
    this.longitude = event.latlng.lng;
    this.latitude = event.latlng.lat;
    if (!this.marker) {
      this.marker = L.marker(event.latlng, {icon: this.locIcon, draggable: true}).addTo(event.target);
      this.marker.on('dragend', this.onMarkerDragEnd.bind(this));
    }
    else {
      this.marker.setLatLng(event.latlng);
    }
    this.cdr.detectChanges();
 }

  onMarkerDragEnd(e: L.LeafletEvent) {
    this.latitude = e.target.getLatLng().lat;
    this.longitude = e.target.getLatLng().lng;
  }

  getMarkerPos(event:any) {
    this.map.on('click', this.onMapClick);
  }

  drawMapMarker() {
    if (!this.marker) {
      this.marker = L.marker([this.latitude, this.longitude], {icon: this.locIcon, draggable: true}).addTo(this.map);
      this.marker.on('dragend', this.onMarkerDragEnd.bind(this));
    }
    else {
      this.marker.setLatLng([this.latitude, this.longitude]);
      this.map.setView([this.latitude, this.longitude], 15);
    }
  }

  private initializeMap() {
    this.map = L.map('map', {
      minZoom: 0,
      maxZoom: 20,
    }).setView([this.latitude, this.longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 1000);
    });

    this.map.on('click', this.onMapClick.bind(this));
  }
}
