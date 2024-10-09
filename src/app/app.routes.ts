import { Routes } from '@angular/router';
import { MainPageComponent } from './root/components/pages/main-page/main-page.component';
import { RefralPageComponent } from './root/components/pages/refral-page/refral-page.component';
import { WheelComponent } from './root/components/pages/wheel/wheel.component';
import { RoadMapComponent } from './root/components/pages/road-map/road-map.component';
import { BigDatainitService } from './root/services/DataServises/big-datainit.service';
import { state } from '@angular/animations';

export const routes: Routes = [
    {
        path:"",
        component:MainPageComponent,
        resolve: {
            state : BigDatainitService
          }
    },
    {
        path: "Referal",
        component:RefralPageComponent,
        resolve: {
            state : BigDatainitService
          }
    },
    {
        path: 'earn',
        component: WheelComponent,
        resolve: {
          state : BigDatainitService
        }
      },      
        {
    path: "airDrop",
    component: RoadMapComponent,
    resolve: {
        state : BigDatainitService
      }
  }
];
