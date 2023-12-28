import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWords'
})

export class CapitalizeWordsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Capitalize the first letter
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
