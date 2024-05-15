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
  chevronBack,
  chevronBackOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';

interface CurrentListVal {
  valuestring: string;
  imagepath: string;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
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
export class GamePage{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  swiperModules= [IonicSlides];
  public isPlayClicked = true;
  public isContributeClicked = false;
  public isFeedbackClicked = false;
  public currentList= new Array(0);

  public currentListVal: CurrentListVal[] = [];

  status: string = 'init';
  categories: string[]= ['Learn', 'Surveys', 'Feedback'];
  categoryLists: { [key: string]: string [] } = {
    'Learn': ['Traffic Rules', 'Pro Fire Fighter'],
    'Surveys': ['Traffic Accidents in UAE', 'Youth Engagement and Safety'],
    'Feedback': ['Feedback on MOI App', 'Report building/location accessibility issues']
  };
  categoryLists2: { [key: string]: { label: string; image: string }[] } = {
    'Learn': [
      { label: 'Traffic Rules', image: 'cards.png' },
      { label: 'Pro Fire Fighter', image: 'fire.png' },
    ],
    'Surveys': [
      { label: 'Traffic Accidents in UAE', image: 'cargame.png' },
      { label: 'Youth Engagement and Safety', image: 'youthsafety.svg' }
    ],
    'Feedback': [
      { label: 'Report potential misuse of accessibility parking', image: 'report.png' },
      { label: 'Report building/location accessibility issues', image: 'envelope.png' }
    ]
  };

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
      chevronBack,
      chevronBackOutline
    })
  }

  ngOnInit () {
    this.changeList('Learn');
  }

  togglePlayButton() {
    this.currentListVal = [];
    this.isPlayClicked = true;
    this.isContributeClicked = false;
    this.isFeedbackClicked = false;
    this.changeList('Learn');
  }

  toggleContributeButton() {
    this.currentListVal = [];
    this.isPlayClicked = false;
    this.isContributeClicked = true;
    this.isFeedbackClicked = false;
    this.changeList('Surveys');
  }

  toggleFeedbackButton() {
    this.currentListVal = [];
    this.isPlayClicked = false;
    this.isContributeClicked = false;
    this.isFeedbackClicked = true;
    this.changeList('Feedback');
  }

  playGame() {
    console.log('go to profile');
    this.router.navigate(['/start-game']);
  }

  gotoRewards() {
    console.log('go to rewards');
    this.router.navigate(['/game']);
  }

  gotoProfile() {
    console.log('go to profile');
    this.router.navigate(['/landing-page']);
  }

  gotoHelp() {
    console.log('go to page');
    this.router.navigate(['/helppage']);
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
  changeList(category: string) {
    console.log(category);
    this.status = category;
    console.log('status ' + this.status);
    for (let i = 0; i < this.categoryLists[category].length; i++) {
      this.currentListVal.push({valuestring: this.categoryLists2[category][i].label, imagepath: this.categoryLists2[category][i].image});
      this.currentList = this.categoryLists[category];
      // this.currentListVal[i].value = this.categoryLists[category][i].label;
    }
    // console.log(this.categoryLists[category][].label);
    // this.currentList = this.categoryLists[category][0].label[0];
  }

  startGame() {
    console.log('Play Game');
    this.router.navigate(['/start-game']);
  }

  gotoReport() {
    console.log('Play Game');
    this.router.navigate(['/podreport']);
  }
}
