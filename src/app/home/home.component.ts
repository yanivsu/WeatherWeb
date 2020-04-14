import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { LocationService } from '../services/location.service';
import { forcastService } from '../services/forcast.services';
import { IForecast } from 'src/models/forcast.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  @Input() darkMode = false;
  public forcastForInit: IForecast[] = [];
  public iconURL = environment.iconUrl;
  private forcastSubscripition: Subscription;

  constructor(private locationService: LocationService, private forcastService: forcastService) { }

  ngOnInit(): void {
      this.forcastSubscripition = this.forcastService.forcastChanged.subscribe(result => {
      this.forcastForInit = result;
    });
    this.forcastService.getFiveDaysForcastByCityKey('215854');  
  }
  ngOnDestroy() {
    this.forcastSubscripition.unsubscribe();
  }
  checker(){
    console.log(this.darkMode);
  }

}
