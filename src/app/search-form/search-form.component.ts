import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';

import { LocationService } from '../services/location.service';
import { ICity } from 'src/models/city.model';
import { forcastService } from '../services/forcast.services';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() cityEventEmitter = new EventEmitter<string>();
  citiesFormGroup: FormGroup;
  selectedCity: ICity;
  citiesOptions = [];
  constructor(private forcastServics: forcastService ,private locationServics: LocationService ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.citiesFormGroup = this.formBuilder.group({
      cityInput: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.citiesFormGroup.get('cityInput')
    .valueChanges
    .pipe(
      debounceTime(400),
      switchMap(value => 
        this.locationServics.getLocationsSearch(value)))
      .subscribe(result => {
        console.log(result);
        this.citiesOptions = result;
      });
  }
  displayFunction(city: string) {
     if(city)
       return city["LocalizedName"];
     else
      return '';
  }
  getCity(cityName: string) {
    console.log(cityName);
    this.selectedCity = {
      id: cityName["Key"],
      name: cityName["LocalizedName"]
    }
    this.forcastServics.getFiveDaysForcastByCityKey(this.selectedCity.id);
    this.forcastServics.getNowCondition(this.selectedCity.id);
    this.cityEventEmitter.emit(this.selectedCity.name);
    this.citiesFormGroup.reset();
  } 

}
