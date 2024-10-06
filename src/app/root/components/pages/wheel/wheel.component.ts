import { Component } from '@angular/core';
declare var Winwheel: any;
declare var gsap: any;
@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.css'
})
export class WheelComponent {
  private wheel: any;

  ngOnInit(): void {
    this.initializeWheel();
  }

  initializeWheel(): void {
    this.wheel = new Winwheel({
      'numSegments': 7,
      'segments': [
        { 'fillStyle': '#eae56f', 'text': 'Prize 1' },
        { 'fillStyle': '#89f26e', 'text': 'Prize 2' },
        { 'fillStyle': '#7de6ef', 'text': 'Prize 3' },
        { 'fillStyle': '#e7709f', 'text': 'Prize 4' },
        { 'fillStyle': '#c7777f', 'text': 'Prize 5' },
        { 'fillStyle': '#99999e', 'text': 'Prize 6' },
        { 'fillStyle': '#e3306f', 'text': 'Prize 7' }
      ],
      'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 10,
        'callbackFinished': this.alertPrize
      }
    });
  }
  
  startSpin(): void {
    this.resetWheel();
    const stopAngle = this.calculateStopAngle();
    this.wheel.animation.stopAngle = stopAngle;
    this.wheel.startAnimation();
  }
  
  resetWheel(): void {
    this.wheel.stopAnimation(false); 
    this.wheel.rotationAngle = 0; 
    this.wheel.draw(); 
  }

  calculateStopAngle(): number {
    const random = Math.random() *50;
    if (random <= 10) {
      return Math.random() * 36; // Prize 1
    } else if (random <= 30) {
      return 36 + Math.random() * 72; // Prize 2
    } else if (random <= 60) {
      return 108 + Math.random() * 108; // Prize 3
    } else {
      return 216 + Math.random() * 144; // Prize 4
    }
  }
  
  alertPrize(indicatedSegment: any): void {
    alert("You have won " + indicatedSegment.text);
  }
}
