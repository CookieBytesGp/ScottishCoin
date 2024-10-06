import { Component } from '@angular/core';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { ReferalService } from '../../../services/referal.service';
import { DefaultNames } from '../../../models/defultNames';

@Component({
  selector: 'app-refral-page',
  standalone: true,
  imports: [],
  providers:[TelegramWebappService , ReferalService],
  templateUrl: './refral-page.component.html',
  styleUrl: './refral-page.component.css'
})
export class RefralPageComponent {
 
  referralCode: string = "";
  AppNames : DefaultNames = new DefaultNames();
  
  constructor(private referalService: ReferalService, private telService: TelegramWebappService) { }
  
  
  generateReferralLinkString() {
    this.referralCode = this.referalService.generateReferralCode();
     
  }
  ngOnInit() {
    // const initData = this.referalService.getInitData();
    
    this.telService.webApp.CloudStorage.getItem(this.AppNames.profile.refralCode, (e, value) => {
      
      if (e != null) {
        console.log(e)
      }
      
      else {
        if(value != ""){
          this.referralCode = value;
        }else{
          this.generateReferralLinkString();
          this.telService.webApp.CloudStorage.setItem(this.AppNames.profile.refralCode, this.referralCode, (e: string | null, bool: boolean) => {
          
          if (e != null) {
            
            console.log(e)
            
          } 
          
          else {
            
            console.log("okeye")
            
          }
          
        })
        }
        console.log("its call back log", value);
        
      }
    })

    // console.log(initData);

  }

  generateReferralLink() {
    if(this.referralCode != ""){
      this.referalService.sendReferralLink(this.referralCode);
    }else{
      alert("kir shodi")
    }
  }
}
