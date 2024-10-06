import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./root/components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';
import { NavComponent } from './root/components/shared/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent , CommonModule , NavComponent],
  providers:[TelegramWebappService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'scottishcoin';
  constructor(private telServise: TelegramWebappService){}

  loading : boolean = true;
  mainapp : boolean = false; 
  refferer : string = "";
  ngOnInit(){
    setTimeout(() => {
      this.loading = false;
      this.mainapp = true ;
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
}
