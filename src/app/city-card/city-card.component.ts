import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

import { LocationService } from '../services/location.service';
import { forcastService } from '../services/forcast.services';
import { ICity } from 'src/models/city.model';
import { IConditions } from 'src/models/conditions.model'; 
import { environment } from 'src/environments/environment';
import { FavoriteService } from '../services/favorite.service';



@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit, OnDestroy {

  private conditionSubscription: Subscription;
  private favoriteSubscription: Subscription;
  private initCondition: IConditions = { degree: 0, currentWeather: "null", icon: 1};
  darkMode = false;
  private animationItem: AnimationItem;
  flag = true;

  options: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_z8PADV.json',
    loop: false,
    autoplay: true
  };

  styles: Partial<CSSStyleDeclaration> = {
    margin: '0 auto',
    height: '150px',
    width: '150px',
    display: 'none',
  };

  @Output() addFaveCity = new EventEmitter<ICity>();


  public iconURL = environment.iconUrl;
  city: ICity = {
    id: "215854",
    name: "Tel Aviv",
    condition: this.initCondition
  };
  
  constructor(private locationSerivce: LocationService, 
              private forcastService: forcastService, 
              private faveSerive: FavoriteService) { }

  ngOnInit(): void {
    this.conditionSubscription = this.forcastService.nowConditionChanged.subscribe(result => {
      this.city.condition = result;
    });
    this.forcastService.getNowCondition("215854");
  }

  changeCityNameOnly(cityName: string) {
       this.city.name = cityName;
  }

  addCityFave(newCity: ICity) {
    this.faveSerive.addNewCity(newCity);

    this.styles = {
      margin: '0 auto',
      height: '90px',
      width: '90px',
      display:'block',
    };
    this.animationItem.play();
  }

  complete() {
    console.log('complted!');
    this.styles = {
      display:'none'
    };
    this.animationItem.stop();
  }
  
  changeTheme() {
    this.darkMode = !this.darkMode;
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;

  }
  
  ngOnDestroy() {
    this.conditionSubscription.unsubscribe();
  }

}
