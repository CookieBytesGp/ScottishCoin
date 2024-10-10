import { Injectable } from '@angular/core';
import { BigDataModel } from '../../models/bigDataModel';
import { BehaviorSubject, firstValueFrom, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { DefaultNames } from '../../models/defultNames';

@Injectable({
  providedIn: 'root'
})
export class BigDatainitService implements Resolve<BigDataModel> {
  constructor(private telServise : TelegramWebappService){};
  AppNames:DefaultNames = new DefaultNames();
  private dataModel: BigDataModel = new BigDataModel();
  
  private data = new BehaviorSubject<BigDataModel>(this.dataModel);
  bigDataInit : BigDataModel = new BigDataModel();
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BigDataModel> {
    try {
      const result = await this.gatherer(this.bigDataInit);
      if (result) {
        this.setData(result);
      }
      return await this.getData(); // Ensure you return the data model
    } catch (error) {
      console.error('Error while gathering data:', error);
      // Handle the error (e.g., show an error message to the user)
      throw error; // Re-throw the error if necessary
    }
  }
  
  async gatherer(bigDataInit: BigDataModel  ): Promise< BigDataModel> {
    
    try {



      // Populate profile information
      bigDataInit.profile.firstName = this.telServise.webApp.initDataUnsafe.user?.first_name;
      bigDataInit.profile.lastName = this.telServise.webApp.initDataUnsafe.user?.last_name;
      bigDataInit.profile.profilePicture = this.telServise.webApp.initDataUnsafe.user?.photo_url;
      bigDataInit.profile.username = this.telServise.webApp.initDataUnsafe.user?.username;
      // gatheringCount++;
      
    
      // Retrieve referral code from CloudStorage
      const referralCode = await this.getCloudStorageItem(this.AppNames.profile.refralCode);
      bigDataInit.profile.refralCode = referralCode;
      // gatheringCount++;
    

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
      

      bigDataInit.score.profit = await this.getCloudStorageItem(this.AppNames.scores.profit);
      // gatheringCount++;
      

      bigDataInit.score.dateStartCollect = await this.getCloudStorageItem(this.AppNames.scores.dateStartCollect);
      // gatheringCount++;
      

      // Retrieve currency information
      bigDataInit.currencies.coins = await this.getCloudStorageItem(this.AppNames.currencies.coins);

      // gatheringCount++;
      
      
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

 
  async setData(Value: BigDataModel) {
    this.data.next(Value);
  }
  async getData() : Promise<BigDataModel> {
    const result = await this.gatherer(this.bigDataInit);
    if (result) {
      this.setData(result);
      return firstValueFrom(this.data.asObservable()); // Convert Observable to Promise
    }
    throw new Error('Failed to gather data');
  }
  // private bigDataInit! : BigDataModel ;
  // private sharedObject = new BehaviorSubject<BigDataModel>(this.bigDataInit);
  // sharedObject$ = this.sharedObject.asObservable();
  // // private sharedData = new BehaviorSubject<BigDataModel>(this.bigDataInit);

  // constructor() {}

  // setObject(obj: any) {
  //   this.sharedObject.next(obj);
  //     console.log("its service log" ,this.sharedObject.value, obj)
  // }

  // getObject() {
  //     console.log('Current shared data value:', this.bigDataInit , this.sharedObject.value);
  //   return this.sharedObject.value;
  // }


  // sharedData$() : BigDataModel{
  //   return this.bigDataInit;
  // }
  // updateSharedData(obj : BigDataModel){
  //   // this.sharedData.next(obj);
  //   this.bigDataInit = obj;
  // }


}
