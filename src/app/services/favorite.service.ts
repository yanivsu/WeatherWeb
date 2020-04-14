import { Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat';

import { ICity } from 'src/models/city.model';

@Injectable()
export class FavoriteService {
    private favoriteCities: ICity[] = [];
    favoriteCitiesChanged = new Subject<ICity[]>();

    addNewCity(newCity: ICity) {
        let index = 0;
        let flag = false;
        this.favoriteCities.forEach(element => {
            if (element.id === newCity.id)
            {
                flag = true;
                return;
            }
            index += 1;
        });
        if (flag)
            this.favoriteCities.splice(index, 1);
        else
            this.favoriteCities.push(newCity);
        console.log(this.favoriteCities);
    }
    getCities() {
        this.favoriteCitiesChanged.next([...this.favoriteCities]);
    }
}