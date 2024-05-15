import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PhaserServiceService extends Phaser.Scene {
  constructor() {
    super ({ key: 'Scene' });
  }

  public preload(): void {
    console.log('GameService::Phaser preload() | method called');
    this.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', {
      frameWidth: 37,
      frameHeight: 45
    });
  }

  public create(): void {
    console.log('PhaserServiceService::Phaser create() | methoc called');

    const mummyAnimation = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('mummy', {
        start: 0,
        end: 11
      }),
      frameRate: 16,
      repeat: 0
    });

    const sprite = this.add.sprite(50, 300, 'mummy').setScale(4);

    sprite.play('walk');

    sprite.anims.setRepeat(7);

    this.tweens.add({
      targets: sprite,
      x: 750,
      duration: 8800,
      ease: 'Linear'
    });
  }
}