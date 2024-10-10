import { Injectable } from '@angular/core';
import { BigDataModel } from '../../models/bigDataModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService {

  constructor() { }

  private dataModel: BigDataModel = new BigDataModel();
  
  private data = new BehaviorSubject<BigDataModel>(this.dataModel);

  setData(Value: BigDataModel) : void {
    this.data.next(Value);
  }
  getData() : Observable<BigDataModel> {
    return this.data.asObservable();
  }
}
