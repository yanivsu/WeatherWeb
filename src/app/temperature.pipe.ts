import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temp: number): number {
    return Math.round((temp - 32) * 5 / 9);
  }

}
