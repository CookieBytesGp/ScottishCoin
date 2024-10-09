import { AfterViewInit, Component, inject, OnInit, SimpleChanges } from '@angular/core';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { HeaderComponent } from '../../shared/header/header.component';
import { DefaultNames } from '../../../models/defultNames';
import { BigDatainitService } from '../../../services/DataServises/big-datainit.service';
import { BigDataModel } from '../../../models/bigDataModel';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent],
  providers:[TelegramWebappService , BigDatainitService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(private telServise: TelegramWebappService  , private route : ActivatedRoute) { }
  Appnames : DefaultNames = new DefaultNames();
  bigDataInit : BigDataModel = new BigDataModel();
  bigDataService = inject(BigDatainitService);
  // Scores : string[] = ["score" ] ;
  score : any ; 
  // Unscurescore: any = this.telServise.webApp.CloudStorage.getItem(this.Scores[0] , (e , value) => {
    //   if(e){
      //     console.log(e)
      //   }else{
        //     console.log("its call back log" , value);
        //     this.score = Number(value)
        
        //   }
        // } ) ; 
        
        firstName: string | undefined;
        lastName: string | undefined;
        
        
        
        
        
        ngOnInit() {
          const state = history.state;
          console.log(state,this.bigDataInit);
          this.bigDataInit = state;
      this.bigDataService.getData().subscribe((value) => {console.log("its data get from service main", value,this.bigDataInit) ;  })

          this.firstName = this.bigDataInit.profile.firstName;
          this.lastName = this.bigDataInit.profile.lastName;
          this.score = this.bigDataInit.score.profitCollectCoin;
          // this.telServise.webApp.CloudStorage.getItem(this.Appnames.scores.Score , (e , value) => {
            //   if(e != null){
              //     console.log(e)
              //   }else{
                //     console.log("its call back log" , value);
                //     this.score = Number(value)
                
                //   }
                // } )
                // setTimeout(() => {
                  
                //   this.telServise.webApp.CloudStorage.setItem(this.Appnames.scores.Score , (this.score).toString() , (e : string | null , bool : boolean ) => {
                  //     if(e != null){
    //       console.log(e)
    //     }else{
      //       console.log("Score is Succsessfully : " , bool)
      //     }
      //    })
      // }, 1000);
    }
    ngAfterViewInit(): void {
      this.bigDataService.getData().subscribe((value) => {console.log("its data get from service main", value,this.bigDataInit) ;  })
      
      // throw new Error('Method not implemented.');
    };
     ngDoCheck() {
       this.bigDataService.getData().subscribe((value) => {console.log("its data get from service main", value,this.bigDataInit) ;  })
       console.log("its data get from service main",this.bigDataInit)}
      // this.bigDataService.updateSharedData(this.bigDataInit);
      
      // console.log(this.bigDataInit);
      // this.bigDataInit =  this.bigDataService.sharedData$();
      // this.bigDataService.sharedData$().subscribe(bigDataPack => {
        //   this.bigDataInit = bigDataPack;
        
        //   console.log("this is log of yeaar" , bigDataPack);
        // });
    
    // this.firstName = this.bigDataInit.profile.firstName;
    // this.lastName = this.bigDataInit.profile.lastName;
    // this.score = this.bigDataInit.score.profitCollectCoin;
    // const componentObj = this.bigDataInit;
    // let dynamicObj  = this.bigDataService.sharedData$();
    
    
    // if (componentObj !== dynamicObj) {
    //   // Instance value has changed!
    //   console.log('Instance value changed:', dynamicObj);
    //   // Call your update method on the service here
    //   this.bigDataService.updateSharedData(this.bigDataInit);
    // }

  
  
  TopScore(){
    var Nscore = Number(this.score)
    Nscore = Nscore + 1;
    this.telServise.webApp.CloudStorage.setItem(this.Appnames.scores.Score , (Nscore).toString() , (e : string | null , bool : boolean ) => {
      if(e != null){
        console.log(e)
      }else{
        console.log("Score is Succsessfully : " , bool)
      }
     });
     this.score = (Nscore).toString ;
    // this.telServise.webApp.CloudStorage.setItem(this.Scores[0] , (this.score).toString() , (e : string | null , bool : boolean ) => {
    //   if(e != null){
    //     console.log(e)
    //   }else{
    //     console.log("Score is Succsess fully : " , bool)
    //   }
    //  })
    // this.telServise.webApp.CloudStorage.getItem(this.Scores[0] , (e , value) => {
    //   if(e){
    //     console.log(e)
    //   }else{
    //     console.log("its call back log" , value);
    //     this.score = Number(value)
    //   }
    // } )
  }
}
