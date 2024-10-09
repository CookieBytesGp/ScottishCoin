import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { BigDatainitService } from '../../../services/DataServises/big-datainit.service';
import { BigDataModel } from '../../../models/bigDataModel';

@Component({
  selector: 'road-map',
  standalone: true,
  imports: [],
  providers:[BigDatainitService],
  templateUrl: './road-map.component.html',
  styleUrl: './road-map.component.css'
})
export class RoadMapComponent implements OnInit , AfterViewInit {
  constructor(){}
  bigDataService = inject(BigDatainitService);
  bigInitdata! : BigDataModel ;
ngOnInit(): void {
  
  }
ngAfterViewInit(): void {
  }
;

}
