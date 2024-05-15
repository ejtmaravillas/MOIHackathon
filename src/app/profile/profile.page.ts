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
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
export class ProfilePage{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  swiperModules= [IonicSlides];
  public currentList= new Array(0);
  status: string = 'init';
  categories: string[]= ['Learn', 'Surveys', 'Feedback'];
  categoryLists: { [key: string]: string[] } = {
    'Learn': ['Traffic Rules Refresher Game'],
    'Surveys': ['Traffic Accidents in UAE', 'Youth Engagement and Safety'],
    'Feedback': ['Feedback on MOI App', 'Report building or location accessibility issues']
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

  ngOnInit() {
    const swiperOptions = {
      module: 'swiperModules',
      direction: 'horizontal',
      loop: false,
      pagination: 'true',
      slidesPerView: 2.5
    }
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
  changeList(category: string) {
    console.log(category);
    this.status = category;
    console.log('status ' + this.status);
    this.currentList = this.categoryLists[category];
  }

  playGame() {
    console.log('Play Game');
    this.router.navigate(['/game']);
  }

  takeSurvey(item: string) {
    console.log(item);
    const result = this.findIndex(item);
    console.log(result?.index);
    if (result?.index === 0) {
      this.router.navigate(['details/693134']);
    }
    else if (result?.index === 1) {
      this.router.navigate(['/details/823464']);
    }
  }

  writeFeedback(item: string) {
    console.log(item);
    const result = this.findIndex(item);
    console.log(result?.index);
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
