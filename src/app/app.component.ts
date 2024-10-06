import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./root/components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { NavComponent } from './root/components/shared/nav/nav.component';
import { BigDataModel } from './root/models/bigDataModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule, NavComponent, BigDataModel],
  providers: [TelegramWebappService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scottishcoin';
  constructor(private telServise: TelegramWebappService) {

  }
  bigDataInit: BigDataModel = new BigDataModel();

  loading: boolean = true;
  mainapp: boolean = false;
  refferer: string = "";
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.mainapp = true;
      this.telServise.ready()
      this.telServise.expand();
    }, 2000);
    // const referrerIndex = window.location.href;
    // const params = new URLSearchParams(new URL(referrerIndex).search);
    // const referrerValue = params.get('startapp');
    // const referrerId = referrerValue?.slice(11)
    // console.log('referrer ID:', referrerId);

    // window.location.href.slice(referrerIndex + 8 ,  )
  }


  gatherer(bigDataInit: BigDataModel): any {
    bigDataInit.profile.firstName = this.telServise.webApp.initDataUnsafe.user?.first_name;
    bigDataInit.profile.lastName = this.telServise.webApp.initDataUnsafe.user?.last_name;
    bigDataInit.profile.profilePicture = this.telServise.webApp.initDataUnsafe.user?.photo_url;
    bigDataInit.profile.username = this.telServise.webApp.initDataUnsafe.user?.username;
    this.telServise.webApp.CloudStorage.getItem("refralCode", (e, value) => {

      if (e != null) {
        console.log(e)
      } else {
        bigDataInit.profile.refralCode = value;
      }
    })
  }
}
