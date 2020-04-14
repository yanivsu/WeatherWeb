import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ICity } from 'src/models/city.model';

@Injectable()
export class LocationService{
    locationURL = environment.url + 'locations/v1/cities/search?apikey=';
    searchLineURL = environment.url + 'locations/v1/cities/autocomplete?apikey=';
    private apiKey = environment.apiKey;
    constructor(private httpService: HttpClient) {}

    getLocationKey(cityName: string) : Observable<ICity> {
        let fullCityname = ("&q=" + cityName);
        let fullPath = this.locationURL + environment.apiKey + fullCityname;
        return this.httpService.get<string>(fullPath)
        .pipe(map(result => {
            const tempCity: ICity = {
                id: result[0]["Key"],
                name: result[0]["EnglishName"] 
            }
            return tempCity;
        },error => {console.log(error)}));
    }
    getLocationsSearch(searchLine: string) { 
        let fullPathURL = this.searchLineURL + this.apiKey + '&q=' + searchLine;
        return this.httpService.get<string[]>(fullPathURL);
    }
}