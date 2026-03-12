import { Pipe, PipeTransform } from '@angular/core';
import { LevelType } from './employee/employee';

@Pipe({
  name: 'level',
})
export class LevelPipe implements PipeTransform {
  transform(value: LevelType): string {
    let resutl;
    switch (value) {
      case 'J': {
        resutl = 'Junior';
        break;
      }
      case 'S': {
        resutl = 'Senior';
        break;
      }
      case 'J': {
        resutl = 'Moyen';
        break;
      }
      default: {
        resutl = 'Junior';
      }
    }

    return resutl;
  }
}
