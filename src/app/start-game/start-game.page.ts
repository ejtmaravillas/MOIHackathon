import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Navigation, Parallax } from 'swiper/modules';
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
  IonAlert,
  IonGrid,
  IonAvatar,
  IonToolbar,
  IonProgressBar,
  IonicSlides,
} from '@ionic/angular/standalone';
import { Swiper } from 'swiper'
Swiper.use([ Parallax, Navigation ])
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
  paperPlane
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper/types';

interface Question {
  question: string;
  picture: number;
  difficulty: string;
  choices: string[];
  correctAnswer: number;
}

interface Answer {
  color: string[];
  choices: string[];
  answer: number;
  checked: boolean;
}

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.page.html',
  styleUrls: ['./start-game.page.scss'],
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
    IonAlert,
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

export class StartGamePage{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined
  swiperModules= [IonicSlides];

  presentingElement = undefined;
  public currentList= new Array(0);
  public difficulty: string = 'init';
  public image_num = 1;
  public diff:string = 'a';
  public swiperindex = 1;
  public score = 0;
  public submit = 0;
  public customMessage = 'failed';
  public customHeader = 'failed';
  currentquestion: string[] = [];
  listcolor = ['transparent', 'transparent', 'transparent', 'transparent'];
  constructor(private router: Router, private actionSheetCtrl: ActionSheetController) {
    this.initializeAnswers();
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
      paperPlane
    })
  }
  questions: { question: string, picture: number, difficulty: string, choices: string[], correctAnswer: number }[] = [
    {
      question: 'When passing a cyclist or motorcyclsit in a car or other vehicle, you must leave at least how many spaces?',
      picture: 1,
      difficulty: 'e',
      choices: ['25 cm', '50 cm', '1 m', '2 m'],
      correctAnswer: 3
    },
    {
      question: 'On a three lane roundabout, the inside lane should be used by?',
      picture: 2,
      difficulty: 'e',
      choices: ['Any of these', 'Vehicles turning right', 'Vehicles turning left', 'Vehicles going straight on'],
      correctAnswer: 4
    },
    {
      question: 'On a roundabout, if there is no reason controlling traffic and no traffic sign, who has priority?',
      picture: 3,
      difficulty: 'e',
      choices: ['Vehicles coming from behind', 'Behicles coming from ahead', 'Vehicles coming from the left', 'Vehicles coming from the right'],
      correctAnswer: 3
    },
    {
      question: 'Pedestrian have priority over vehicles if?',
      picture: 4,
      difficulty: 'e',
      choices: ['They are walking on the sidewalk you need to cross', 'Any of these apply', 'They are crossing an intersection you are turning into', 'They are waiting at a pedestrian crossing'],
      correctAnswer: 2
    },
    {
      question: 'When making a right turn from a single lane road, you should position yourself?',
      picture: 1,
      difficulty: 'm',
      choices: ['Any of these', 'In the center of the lane', 'Clsoe to the right-hand side', 'Close to the left-hand side'],
      correctAnswer: 3
    },
    {
      question: 'In the absence of a policeman controlling traffic or a traffic sign, at junctions and crossroads, who has priority?',
      picture: 2,
      difficulty: 'm',
      choices: ['Vehicles on the main road', 'Vehicles on side roads', 'The vehicles travelling slowest', 'The vehicles travelling fastest'],
      correctAnswer: 1
    },
    {
      question: 'Approaching a T-junction, who has priority?',
      picture: 3,
      difficulty: 'm',
      choices: ['Vehicles turning right from the joining road', 'Vehicles on the cross road', 'Whoever reaches the junction first', 'Vehicles on the joining road'],
      correctAnswer: 1
    },
    {
      question: 'Truck and bus drivers have blind spots',
      picture: 1,
      difficulty: 'h',
      choices: ['In all of these places', 'Directly behind them', 'Next to the left-hand door', 'Directly in front of them'],
      correctAnswer: 1
    },
    {
      question: 'How close should you be to the vehicle in fron when you commence an overtake?',
      picture: 2,
      difficulty: 'h',
      choices: ['3 seconds', '0.5 seconds', '1 second', '2 seconds'],
      correctAnswer: 4
    },
  ];
  public total = this.questions.length;
  public progTotal = this.score / this.total;
  questions1: Question[] = [
    {
      question: 'When passing a cyclist or motorcyclsit in a car or other vehicle, you must leave at least how many spaces?',
      picture: 1,
      difficulty: 'e',
      choices: ['25 cm', '50 cm', '1 m', '2 m'],
      correctAnswer: 3
    },
    {
      question: 'On a three lane roundabout, the inside lane should be used by?',
      picture: 2,
      difficulty: 'e',
      choices: ['Any of these', 'Vehicles turning right', 'Vehicles turning left', 'Vehicles going straight on'],
      correctAnswer: 4
    },
    {
      question: 'On a roundabout, if there is no reason controlling traffic and no traffic sign, who has priority?',
      picture: 3,
      difficulty: 'e',
      choices: ['Vehicles coming from behind', 'Behicles coming from ahead', 'Vehicles coming from the left', 'Vehicles coming from the right'],
      correctAnswer: 3
    },
    {
      question: 'Pedestrian have priority over vehicles if?',
      picture: 4,
      difficulty: 'e',
      choices: ['They are walking on the sidewalk you need to cross', 'Any of these apply', 'They are crossing an intersection you are turning into', 'They are waiting at a pedestrian crossing'],
      correctAnswer: 2
    },
    {
      question: 'When making a right turn from a single lane road, you should position yourself?',
      picture: 1,
      difficulty: 'm',
      choices: ['Any of these', 'In the center of the lane', 'Clsoe to the right-hand side', 'Close to the left-hand side'],
      correctAnswer: 3
    },
    {
      question: 'In the absence of a policeman controlling traffic or a traffic sign, at junctions and crossroads, who has priority?',
      picture: 2,
      difficulty: 'm',
      choices: ['Vehicles on the main road', 'Vehicles on side roads', 'The vehicles travelling slowest', 'The vehicles travelling fastest'],
      correctAnswer: 1
    },
    {
      question: 'Approaching a T-junction, who has priority?',
      picture: 3,
      difficulty: 'm',
      choices: ['Vehicles turning right from the joining road', 'Vehicles on the cross road', 'Whoever reaches the junction first', 'Vehicles on the joining road'],
      correctAnswer: 1
    },
    {
      question: 'Truck and bus drivers have blind spots',
      picture: 1,
      difficulty: 'h',
      choices: ['In all of these places', 'Directly behind them', 'Next to the left-hand door', 'Directly in front of them'],
      correctAnswer: 1
    },
    {
      question: 'How close should you be to the vehicle in front when you commence an overtake?',
      picture: 2,
      difficulty: 'h',
      choices: ['3 seconds', '0.5 seconds', '1 second', '2 seconds'],
      correctAnswer: 4
    },
  ];

  answers: Answer[] = [];

  private initializeAnswers() {
    this.answers = this.questions.map((question, index) => ({
      color: ['transparent', 'transparent', 'transparent', 'transparent'],
      choices: question.choices,
      answer: 10,
      checked: false
    }));
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
    },
  ];

  swiperInit() {
    this.currentquestion = this.questions[0].choices;
    if (this.questions[0].difficulty == 'e') {
      this.difficulty = 'Easy';
    }
    else if (this.questions[0].difficulty == 'm')
    {
      this.difficulty = 'Middle';
    }
    else if (this.questions[0].difficulty == 'h')
    {
      this.difficulty = 'Hard';
    }
  }

  getAnswer(index: number) {
    this.answers[this.image_num - 1].answer = index + 1;
    this.answers[this.image_num - 1].color = ['transparent','transparent','transparent','transparent'];
    this.answers[this.image_num - 1].color[index] = '#5BB1B1';

  }
  swiperSlideChanged() {
    this.image_num = this.swiperRef?.nativeElement.swiper.activeIndex + 1;
    this.currentquestion = this.questions[this.image_num - 1].choices;
    for (let i = 0; i < 4; i++) {
      console.log(this.currentquestion[i]);
    }
    if (this.questions[this.image_num - 1].difficulty == 'e') {
      this.difficulty = 'Easy';
    }
    else if (this.questions[this.image_num - 1].difficulty == 'm')
    {
      this.difficulty = 'Middle';
    }
    else if (this.questions[this.image_num - 1].difficulty == 'h')
    {
      this.difficulty = 'Hard';
    }
  }

  backPage() {
    this.router.navigate(['/game']);
  }

  resetAnswer() {
    for (let i = 0; i < this.answers.length; i++) {
      this.answers[i].color = ['transparent','transparent','transparent','transparent'];
      this.answers[i].answer = 0;
    }
    this.score = 0;
    this.customMessage = 'NULL';
    this.customHeader = 'failed';
    this.submit = 0;
  }

  submitAnswer() {
    for (let i = 0; i < this.answers.length; i++) {
      console.log(this.answers[i].answer);
      if ((this.answers[i].answer == this.questions[i].correctAnswer) && (this.answers[i].checked == false)) {
        this.score++;
        this.progTotal = this.score / this.total;
        this.answers[i].color[this.answers[i].answer - 1] = 'green';
        this.answers[i].checked = true;
      }
      else if ((this.answers[i].answer != this.questions[i].correctAnswer) && (this.answers[i].checked == false)) {
        this.answers[i].color[this.answers[i].answer - 1] = 'red';
      }
      else if ((this.answers[i].answer == this.questions[i].correctAnswer) && (this.answers[i].checked == true)) {
        this.answers[i].color[this.answers[i].answer - 1] = 'green';
      }
      else {
        this.answers[i].color[this.answers[i].answer - 1] = 'red';
      }
    }
    this.submit = 1;
    this.customMessage = 'Your score is '+this.score+' out of '+this.total;
    if ((this.score / this.total) > 0.7) {
      this.customHeader = 'Passed!';
    }
    else {
      this.customHeader = 'Failed';
    }
  }
}
