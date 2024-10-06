import { Component, Input, SimpleChanges } from '@angular/core';
import { RoadMapComponent } from '../../pages/road-map/road-map.component';

@Component({
  selector: 'Myloading',
  standalone: true,
  imports: [RoadMapComponent ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  constructor() { }
  @Input() value: number = 0;
  porgress : string = "";
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.porgress = this.handleAction(changes);
  }
  handleAction(changes: SimpleChanges) : string{
    console.log("fstarted")
      switch (changes["value"].currentValue) {
        case 6:
          return "100%";
        case 3:
          return "75%";
        case 2:
          return "50%";
        case 1:
          return "25%";
        default:
          return "0";
    }
  }
}
