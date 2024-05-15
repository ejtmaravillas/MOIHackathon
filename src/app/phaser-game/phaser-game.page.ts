import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import Phaser from 'phaser';
import { PhaserServiceService } from '../phaser-service.service';

@Component({
  selector: 'app-phaser-game',
  templateUrl: './phaser-game.page.html',
  styleUrls: ['./phaser-game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PhaserGamePage implements OnInit {

  public readonly gameConfig = {
    title: 'Game Title',
    version: '1.0',
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight
  }
  constructor(public mainScene: PhaserServiceService) {

  }

  ngOnInit(): void {
    console.log('PhaseGame::ngOnInit() | method called');
  }

  onGameReady(game: Phaser.Game): void {
    game.scene.add('Scene', this.mainScene, true);
  }
}
