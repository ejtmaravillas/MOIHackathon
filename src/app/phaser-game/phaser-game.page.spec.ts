import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhaserGamePage } from './phaser-game.page';

describe('PhaserGamePage', () => {
  let component: PhaserGamePage;
  let fixture: ComponentFixture<PhaserGamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaserGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
