import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { AppRotuingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LocationService } from './services/location.service';
import { forcastService } from './services/forcast.services';
import { TemperaturePipe } from './temperature.pipe';
import { CityCardComponent } from './city-card/city-card.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FavoriteService } from './services/favorite.service';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TemperaturePipe,
    CityCardComponent,
    SearchFormComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRotuingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [LocationService, forcastService, FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
