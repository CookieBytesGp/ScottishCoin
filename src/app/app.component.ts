// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DefaultNames } from './root/models/defultNames';
import { BigDataModel } from './root/models/bigDataModel';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { NavComponent } from './root/components/shared/nav/nav.component';
import { LoadingComponent } from "./root/components/shared/loading/loading.component";
import { BigDatainitService } from './root/services/DataServises/big-datainit.service';
import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule, NavComponent],
  providers: [TelegramWebappService , BigDatainitService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'scottishcoin';
  constructor(private telServise: TelegramWebappService  , private router : Router , private dataService : BigDatainitService) {
  }
  ngAfterViewInit(): void {
    this.dataService.setData(this.bigDataInit)

          this.dataService.getData().subscribe((value) => {console.log(" app after view" , value) })
    // throw new Error('Method not implemented.');
  }
  ngDoCheck() {
    this.dataService.getData().subscribe((value) => {console.log("do check app" , value) })
    this.dataService.setData(this.bigDataInit)
    this.dataService.getData().subscribe((value) => {console.log("do check app" , value) })

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
      if(result){
        // this.setSharedObject(this.bigDataInit);
        // this.bigdataService.sharedData$().subscribe(bigDataPack => {
          //   this.bigDataInit = bigDataPack;
          
          //   console.log("this is log of yeaar" , bigDataPack);
          // });
          this.loading = false;
          this.mainapp = true;
          // Now myBigData is populated with the gathered information
          console.log('Gathering completed:' ,this.bigDataInit );
          this.dataService.setData(this.bigDataInit)

          this.dataService.getData().subscribe((value) => {console.log("before navigation app" , value) })
          // this.router.navigateByUrl('/', { state: this.bigDataInit });
          this.router.navigate(['/']);
      }
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
  // setSharedObject(obj: BigDataModel) {
  //   this.bigdataService.setObject(obj);
  // }

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
      
    
      // Retrieve referral code from CloudStorage
      const referralCode = await this.getCloudStorageItem(this.AppNames.profile.refralCode);
      bigDataInit.profile.refralCode = referralCode;
      // gatheringCount++;
      this.progressbar++;
    

      // Retrieve scores
      bigDataInit.score.profitCollectCoin = await this.getCloudStorageItem(this.AppNames.scores.Score);
      if(bigDataInit.score.profitCollectCoin == "NaN"){
        this.telServise.webApp.CloudStorage.setItem(this.AppNames.scores.Score , "0" , (e : string | null , bool : boolean ) => {
          if(e != null){
            console.log(e)
          }else{
            console.log("Score is Succsessfully : " , bool);
          }
         });
      bigDataInit.score.profitCollectCoin = await this.getCloudStorageItem(this.AppNames.scores.Score);

      }
      // gatheringCount++;
      this.progressbar++;
      

      bigDataInit.score.profit = await this.getCloudStorageItem(this.AppNames.scores.profit);
      // gatheringCount++;
      this.progressbar++;
      

      bigDataInit.score.dateStartCollect = await this.getCloudStorageItem(this.AppNames.scores.dateStartCollect);
      // gatheringCount++;
      this.progressbar++;
      

      // Retrieve currency information
      bigDataInit.currencies.coins = await this.getCloudStorageItem(this.AppNames.currencies.coins);

      // gatheringCount++;
      this.progressbar++;
      
      
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
