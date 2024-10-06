import { Component } from '@angular/core';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';

@Component({
  selector: 'Myheader',
  standalone: true,
  imports: [],
  providers:[TelegramWebappService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private telServise: TelegramWebappService ) { };

  Scores : string[] = ["score" ] ;
  score : any ; 
  firstName: any;
  lastName: any;

  question1 : any ;

  ngOnInit() {
    this.firstName = this.telServise.initDataUnsafe.user?.first_name;
    this.lastName = this.telServise.initDataUnsafe.user?.last_name;
    this.question1 = this.telServise.initDataUnsafe.user?.id;
    this.telServise.webApp.CloudStorage.getItem(this.Scores[0] , (e , value) => {
      if(e != null){
        console.log(e)
      }else{
        console.log("its call back log" , value);
        this.score = Number(value)
        
      }
    } )
    setTimeout(() => {
      
      this.telServise.webApp.CloudStorage.setItem(this.Scores[0] , (this.score).toString() , (e : string | null , bool : boolean ) => {
        if(e != null){
          console.log(e)
        }else{
          console.log("Score is Succsessfully : " , bool)
        }
       })
    }, 1000);
  }
}
