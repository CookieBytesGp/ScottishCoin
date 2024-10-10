import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { BigDataModel } from '../../../models/bigDataModel';
import { BigDatainitService } from '../../../services/DataServises/big-datainit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Myheader',
  standalone: true,
  imports: [],
  providers:[TelegramWebappService , BigDatainitService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  bigDataInit! : BigDataModel ;
  constructor(private telServise: TelegramWebappService  , private route : ActivatedRoute 
    // , private bigDataService : BigDatainitService
  ) {
    // const navigation = this.router.getCurrentNavigation();
    // this.bigDataInit = navigation?.extras?.state?.['BigData']
    // console.log(navigation?.extras?.state?.['BigData'] , navigation)
   }
   bigDataService = inject(BigDatainitService);
   Scores : string[] = ["score"] ;
   score : string | undefined ; 
   firstName: string | undefined;
   lastName: string | undefined;
   
   // question1 : any ;
   
   ngOnInit() {
     // this.route.queryParams.subscribe(params => {
      //   const serializedBase = params['base']; // Get the serialized object
      //   this.bigDataInit = JSON.parse(serializedBase) as BigDataModel; // Parse it back to the expected type
      // });
      const state = history.state;
      console.log(state,this.bigDataInit);
      this.bigDataInit = state;
      // this.bigDataService.setData(this.bigDataInit);
      // this.bigDataService.getData().subscribe((value) => {console.log("its data get from service header", value,this.bigDataInit) ;  })
        
        this.firstName = this.bigDataInit.profile.firstName;
        this.lastName = this.bigDataInit.profile.lastName;
        this.score = this.bigDataInit.score.profit;
        // this.bigDataService.sharedObject$.subscribe(obj => {
          //   this.bigDataInit = obj;
          //   console.log(obj ,this.bigDataInit);
          // });
          // this.bigDataService.sharedData$().subscribe(bigDataPack => {
            //   console.log("this is log of yeaar" , bigDataPack);
            //   this.bigDataInit = bigDataPack;
            // });
            // this.firstName = this.bigDataInit.profile.firstName;
            // this.lastName = this.bigDataInit.profile.lastName;
            // this.score = this.bigDataInit.score.profitCollectCoin;
            // this.firstName = this.telServise.initDataUnsafe.user?.first_name;
            // this.lastName = this.telServise.initDataUnsafe.user?.last_name;
            // this.question1 = this.telServise.initDataUnsafe.user?.id;
            // this.telServise.webApp.CloudStorage.getItem(this.Scores[0] , (e , value) => {
              //   if(e != null){
                //     console.log(e)
                //   }else{
    //     console.log("its call back log" , value);
    //     this.score = Number(value)
    
    //   }
    // } )
    // setTimeout(() => {
      
    //   this.telServise.webApp.CloudStorage.setItem(this.Scores[0] , (this.score).toString() , (e : string | null , bool : boolean ) => {
      //     if(e != null){
        //       console.log(e)
        //     }else{
          //       console.log("Score is Succsessfully : " , bool)
          //     }
          //    })
          // }, 1000);
        }
        ngAfterViewInit(): void {
        //  this.bigDataService.getData().subscribe((value) => {console.log("its data get from service header", value,this.bigDataInit) ;  })
         
         // throw new Error('Method not implemented.');
       };
        ngDoCheck() {
          // this.bigDataService.getData().subscribe((value) => {console.log("its data get from service header", value,this.bigDataInit) ;  })
          console.log("its data get from service header",this.bigDataInit)
          // this.bigDataService.updateSharedData(this.bigDataInit);
          
          // console.log(this.bigDataInit);
    // this.bigDataInit =  this.bigDataService.sharedData$();
    // this.bigDataService.sharedData$().subscribe(bigDataPack => {
    //   this.bigDataInit = bigDataPack;
      
    //   console.log("this is log of yeaar" , bigDataPack);
    // });
    
  }
}
