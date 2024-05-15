import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonImg,
  IonicSlides,
} from '@ionic/angular/standalone';
import { Swiper } from 'swiper';
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
  chevronBack,
  chevronBackOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';

interface CurrentListVal {
  valuestring: string;
  imagepath: string;
}
@Component({
  selector: 'app-helppage',
  templateUrl: './helppage.page.html',
  styleUrls: ['./helppage.page.scss'],
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
    IonImg,
    IonProgressBar,
    CurrencyPipe,
    DatePipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HelppagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('init');
  }

  gotoRewards() {
    console.log('go to rewards');
    this.router.navigate(['/game']);
  }
  gotoProfile() {
    console.log('go to profile');
    this.router.navigate(['/landing-page']);
  }
  gotoReport() {
    console.log('Play Game');
    this.router.navigate(['/podreport']);
  }

  gotoHelp() {
    console.log('go to page');
    this.router.navigate(['/helppage']);
  }

}
