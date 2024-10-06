import { CurrenciesModel } from "./currenciesModel";
import { ProfileModel } from "./profileModel"
import { ScoreModel } from "./ScoreModel"

export class BigDataModel {
    profile :ProfileModel = new ProfileModel();
    score : ScoreModel = new ScoreModel();
    currencies: CurrenciesModel = new CurrenciesModel();
}