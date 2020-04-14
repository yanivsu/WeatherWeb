import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICity } from 'src/models/city.model';
import { Subscription } from 'rxjs-compat';

import { FavoriteService } from '../services/favorite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {


  public iconURL = environment.iconUrl;
  public citiesFaveArray: ICity[] = [];
  private favoriteSubscripition: Subscription;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favoriteSubscripition = this.favoriteService.favoriteCitiesChanged.subscribe(result => {
      this.citiesFaveArray = result;
    });
    this.favoriteService.getCities();
  }

  ngOnDestroy() {
    this.favoriteSubscripition.unsubscribe();
  }

}
