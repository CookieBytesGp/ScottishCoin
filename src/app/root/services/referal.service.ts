import { Injectable } from '@angular/core';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';

@Injectable({
  providedIn: 'root'
})
export class ReferalService {

  
  constructor(private telService: TelegramWebappService) { }

  getInitData() {
    return this.telService.initData;
  }

  generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  sendReferralLink(referralCode: string) {
    // const referr = this.telService.initDataUnsafe.user?.id;
    const link = `https://t.me/meemefindbot/start?startapp=${referralCode}`;
    navigator.clipboard.writeText(link).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
    
  }
}
