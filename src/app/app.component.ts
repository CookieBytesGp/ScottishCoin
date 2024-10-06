import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./root/components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { NavComponent } from './root/components/shared/nav/nav.component';
import { BigDataModel } from './root/models/bigDataModel';
import { Observable } from 'rxjs';
import { DefaultNames } from './root/models/defultNames';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule, NavComponent],
  providers: [TelegramWebappService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scottishcoin';
  constructor(private telServise: TelegramWebappService , private router :Router) {
  }
  bigDataInit: BigDataModel = new BigDataModel();
  AppNames: DefaultNames = new DefaultNames();
  progressbar : number = 0;

  loading: boolean = true;
  mainapp: boolean = false;
  refferer: string = "";
  async ngOnInit() {
    this.telServise.ready()
    this.telServise.expand();
    try {
      const result = await this.gatherer(this.bigDataInit);
      console.log(this.progressbar)
      this.loading = false;
      this.mainapp = true;
      // Now myBigData is populated with the gathered information
      console.log('Gathering completed:', this.bigDataInit);
      this.router.navigate(['/'], {state:{BigData:this.bigDataInit}})
    } catch (error) {
      console.error('Error while gathering data:', error);
      // Handle the error (e.g., show an error message to the user)
    }



    // setTimeout(() => {
    //   this.loading = false;
    //   this.mainapp = true;
    //   this.telServise.ready()
    //   this.telServise.expand();
      
    // }, 2000);
    // const referrerIndex = window.location.href;
    // const params = new URLSearchParams(new URL(referrerIndex).search);
    // const referrerValue = params.get('startapp');
    // const referrerId = referrerValue?.slice(11)
    // console.log('referrer ID:', referrerId);

    // window.location.href.slice(referrerIndex + 8 ,  )
  }


  // gatherer(bigDataInit: BigDataModel): BigDataModel {

  //   //#region profile
  //   bigDataInit.profile.firstName = this.telServise.webApp.initDataUnsafe.user?.first_name;
  //   bigDataInit.profile.lastName = this.telServise.webApp.initDataUnsafe.user?.last_name;
  //   bigDataInit.profile.profilePicture = this.telServise.webApp.initDataUnsafe.user?.photo_url;
  //   bigDataInit.profile.username = this.telServise.webApp.initDataUnsafe.user?.username;
  //   this.telServise.webApp.CloudStorage.getItem(this.AppNames.profile.refralCode, (e, value) => {

  //     if (e != null) {
  //       console.log(e)
  //     } else {
  //       bigDataInit.profile.refralCode = value;
  //     }
  //   })

  //   //#endregion

  //   //#region Scores


  //   this.telServise.webApp.CloudStorage.getItem(this.AppNames.scores.Score, (e, value) => {

  //     if (e != null) {
  //       console.log(e)
  //     } else {
  //       bigDataInit.score.profitCollectCoin = value;
  //     }
  //   })

  //   this.telServise.webApp.CloudStorage.getItem(this.AppNames.scores.profit, (e, value) => {

  //     if (e != null) {
  //       console.log(e)
  //     } else {
  //       bigDataInit.score.profit = value;
  //     }
  //   })
  //   this.telServise.webApp.CloudStorage.getItem(this.AppNames.scores.dateStartCollect, (e, value) => {

  //     if (e != null) {
  //       console.log(e)
  //     } else {
  //       bigDataInit.score.dateStartCollect = value;
  //     }
  //   })

  //   //#endregion

  //   //#region  currencies
  //   this.telServise.webApp.CloudStorage.getItem(this.AppNames.currencies.coins, (e, value) => {

  //     if (e != null) {
  //       console.log(e)
  //     } else {
  //       bigDataInit.currencies.coins = value;
  //     }
  //   })

  //   //#endregion

  //   return bigDataInit;
  // }


  async gatherer(bigDataInit: BigDataModel  ): Promise< BigDataModel> {
    
    try {



      // Populate profile information
      bigDataInit.profile.firstName = this.telServise.webApp.initDataUnsafe.user?.first_name;
      bigDataInit.profile.lastName = this.telServise.webApp.initDataUnsafe.user?.last_name;
      bigDataInit.profile.profilePicture = this.telServise.webApp.initDataUnsafe.user?.photo_url;
      bigDataInit.profile.username = this.telServise.webApp.initDataUnsafe.user?.username;
      // gatheringCount++;
      this.progressbar++;
      console.log(this.progressbar)
    
      // Retrieve referral code from CloudStorage
      const referralCode = await this.getCloudStorageItem(this.AppNames.profile.refralCode);
      bigDataInit.profile.refralCode = referralCode;
      // gatheringCount++;
      this.progressbar++;
      console.log(this.progressbar)

      // Retrieve scores
      bigDataInit.score.profitCollectCoin = await this.getCloudStorageItem(this.AppNames.scores.Score);
      // gatheringCount++;
      this.progressbar++;
      console.log(this.progressbar)

      bigDataInit.score.profit = await this.getCloudStorageItem(this.AppNames.scores.profit);
      // gatheringCount++;
      this.progressbar++;
      console.log(this.progressbar)

      bigDataInit.score.dateStartCollect = await this.getCloudStorageItem(this.AppNames.scores.dateStartCollect);
      // gatheringCount++;
      this.progressbar++;
      console.log(this.progressbar)

      // Retrieve currency information
      bigDataInit.currencies.coins = await this.getCloudStorageItem(this.AppNames.currencies.coins);

      // gatheringCount++;
      this.progressbar++;
      console.log(this.progressbar)
      
      return  bigDataInit;
    } catch (error) {
      console.error('Error while gathering data:', error);
      // Handle any errors here (e.g., logging, error messages, etc.)
      throw error;
    }
  }

  async getCloudStorageItem(itemName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.telServise.webApp.CloudStorage.getItem(itemName, (error, value) => {
        if (error) {
          console.error(`Error retrieving ${itemName}:`, error);
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

 
}
