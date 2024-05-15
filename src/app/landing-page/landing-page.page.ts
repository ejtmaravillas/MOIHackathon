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
  heart
} from 'ionicons/icons';
import { Router } from '@angular/router';

interface CurrentListVal {
  valuestring: string;
  imagepath: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LandingPagePage{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  swiperModules= [IonicSlides];
  public currentList= new Array(0);
  public isFavoritesClicked = true;
  public isRecentClicked = false;
  public isCaregiverClicked = false;

  public currentListVal: CurrentListVal[] = [];

  status: string = 'init';
  categories: string[]= ['Favorites', 'Recent', 'Caregiver'];
  categoryLists: { [key: string]: string[] } = {
    'Favorites': ['Traffic Fines Payment', 'Traffic Fines History', 'Renew Vehicle Registration', 'Change Try Date'],
    'Recent': ['Traffic Fines Payment', 'Traffic Fines History', 'Renew Vehicle Registration', 'Change Try Date'],
    'Caregiver': ['Issuance of parking permits', 'Issuance of Minor Traffic Accident', 'Renew Vehicle Registration', 'Change Try Date'],
  }
  categoryLists_sample: { [key: string]: string[] } = {
    'Traffic Services': ['Traffic Fines Services', 'Driver and Licensing', 'Training and Try File', 'Vehicle Services', 'To Whom It May Concern Certificates', 'Vehicle Certificate Authentication', 'To Whom It May Concern Certificate Authentication'],
    'Polic Services': ['Policing Services', 'Smart Police Station Services', 'eCrime Services', 'Prison Services', 'Weapon Licensing', 'Federal General Department of Anti-Narcotics'],
    'Civil Defense Services': ['Preventive Fire Safety for Institutions', 'Trading Companies Licensing', 'Renew Trading Companies Licensing', 'Preventive and Safe Procedures for Vehicles', 'Drawing Approval Procedures', 'Prevention and Safety Procedures for Buildings', 'Awareness and Training', 'Hassantuk Services', 'Miscellaneous Services'],
    'General Services': ['General Services', 'Council Hosting Services', 'Appointments and Queue Services', 'Conference and Events Smart Platform'],
  }
  categoryLists2: { [key: string]: { label: string; image: string }[] } = {
    'Favorites': [
      { label: 'Traffic Fines Payment', image: 'list1.png' },
      { label: 'Traffic Fines History', image: 'list2.png' },
      { label: 'Renew Vehicle Registration', image: 'list3.png' },
      { label: 'Change Try Date', image: 'list4.png' },
    ],
    'Recent': [
      { label: 'Traffic Fines Payment', image: 'list1.png' },
      { label: 'Traffic Fines History', image: 'list2.png' },
      { label: 'Renew Vehicle Registration', image: 'list3.png' },
      { label: 'Change Try Date', image: 'list4.png' },
    ],
    'Caregiver': [
      { label: 'Issuance of parking permits', image: 'list1.png' },
      { label: 'Issuance of Minor Traffic Accident', image: 'list2.png' },
      { label: 'Renew Vehicle Registration', image: 'list3.png' },
      { label: 'Change Try Date', image: 'list4.png' },
    ],
  };
  toggleFavoritesButton() {
    this.currentListVal = [];
    this.isRecentClicked = false;
    this.isFavoritesClicked = true;
    this.isCaregiverClicked = false;
    this.changeList('Favorites');

  }
  toggleRecentButton() {
    this.currentListVal = [];
    this.isFavoritesClicked = false;
    this.isRecentClicked = true;
    this.isCaregiverClicked = false;
    this.changeList('Recent');
    // console.log(this.isRecentClicked);
  }

  toggleCaregiverButton() {
    this.currentListVal = [];
    this.isFavoritesClicked = false;
    this.isRecentClicked = false;
    this.isCaregiverClicked = true;
    this.changeList('Caregiver');
  }

  gotoRewards() {
    this.router.navigate(['/game']);
  }

  gotoProfile() {
    this.router.navigate(['/landing-page']);
  }

  constructor(private router: Router) {
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
      heart
    })
  }

  gotoHelp() {
    this.router.navigate(['/helppage']);
  }

  ngOnInit () {
    this.changeList('Favorites');
  }

  changeList(category: string) {
    console.log(category);
    this.status = category;
    for (let i = 0; i < this.categoryLists[category].length; i++) {
      this.currentListVal.push({valuestring: this.categoryLists2[category][i].label, imagepath: this.categoryLists2[category][i].image});
      this.currentList = this.categoryLists[category];
    }
  }

  playGame() {
    this.router.navigate(['/game']);
  }

  takeSurvey(item: string) {
    const result = this.findIndex(item);
    if (result?.index === 0) {
      this.router.navigate(['details/693134']);
    }
    else if (result?.index === 1) {
      this.router.navigate(['/details/823464']);
    }
  }

  writeFeedback(item: string) {
    const result = this.findIndex(item);
    if (result?.index === 0) {
      this.router.navigate(['details/693134']);
    }
    else if (result?.index === 1) {
      this.router.navigate(['/details/823464']);
    }
  }

  findIndex(element: string): { category: string, index: number } | null {
    for (const category in this.categoryLists) {
      if (this.categoryLists.hasOwnProperty(category)) {
        const index = this.categoryLists[category].indexOf(element);
        if (index !== -1) {
          return { category: category, index: index };
        }
      }
    }
    return null;
  }
}
