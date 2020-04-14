import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CityCardComponent } from './city-card/city-card.component';
import { FavoriteComponent } from './favorite/favorite.component'; 

const routes: Routes = [
    {path: '', component: CityCardComponent},
    {path: 'Favorite', component: FavoriteComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRotuingModule {}