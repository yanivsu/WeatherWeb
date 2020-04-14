import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs-compat';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IForecast } from 'src/models/forcast.model';
import { EDays } from 'src/models/EDays.model';
import { IConditions } from 'src/models/conditions.model';


@Injectable()
export class forcastService {
    private forcastFor5Days = environment.url + "forecasts/v1/daily/5day/"
    private nowConditionURL = environment.url + "currentconditions/v1/" 
    private frocastArray: IForecast[] = [];
    private nowCondition: IConditions;
    forcastChanged = new Subject<IForecast[]>();
    nowConditionChanged = new Subject<IConditions>();

    constructor(private httpSerivce: HttpClient) {}

    getFiveDaysForcastByCityKey(cityKey: string) {
        let fullPathURL = this.forcastFor5Days + cityKey + "?" + "apikey=" + environment.apiKey;
        console.log(fullPathURL);
        this.httpSerivce.get<string[]>(fullPathURL)
        .pipe(map(result => {
            const tempForcast: IForecast[] = [];
            result = result["DailyForecasts"];
            result.forEach(day => {
                tempForcast.push({
                    degree: day["Temperature"]["Maximum"],
                    icon: day["Day"]["Icon"],
                    day: EDays[new Date(day["Date"]).getDay().toString()]
                })
            })
            return tempForcast;
        })).subscribe((forcast: IForecast[]) => {
            this.frocastArray = forcast;
            this.forcastChanged.next([...this.frocastArray]);
        });

    }  
    getNowCondition(cityKey: string) {
        let fullPathURL = this.nowConditionURL + cityKey + "?apikey=" + environment.apiKey;
        console.log(fullPathURL);
        this.httpSerivce.get<string>(fullPathURL)
        .pipe(map(result => {
            const condition: IConditions = {
                degree: result[0]["Temperature"]["Imperial"]["Value"],
                currentWeather: result[0]["WeatherText"],
                icon: result[0]["WeatherIcon"]
            }
            return condition;
        })).subscribe((condition: IConditions) => {
            this.nowCondition = condition;
            this.nowConditionChanged.next({...this.nowCondition});
        });
    }
}
