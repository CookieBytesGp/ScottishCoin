import { Routes } from '@angular/router';
import { MainPageComponent } from './root/components/pages/main-page/main-page.component';
import { RefralPageComponent } from './root/components/pages/refral-page/refral-page.component';
import { WheelComponent } from './root/components/pages/wheel/wheel.component';
import { RoadMapComponent } from './root/components/pages/road-map/road-map.component';

export const routes: Routes = [
    {
        path:"",
        component:MainPageComponent
    },
    {
        path: "Referal",
        component:RefralPageComponent
    },
    {
        path: "earn",
        component: WheelComponent
  },
        {
    path: "airDrop",
    component: RoadMapComponent
  }
];
