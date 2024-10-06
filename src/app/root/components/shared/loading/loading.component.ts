import { Component } from '@angular/core';
import { RoadMapComponent } from '../../pages/road-map/road-map.component';

@Component({
  selector: 'Myloading',
  standalone: true,
  imports: [RoadMapComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

}
