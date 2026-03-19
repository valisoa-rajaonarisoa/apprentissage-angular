import { Component } from '@angular/core';
import { Employee } from './employee/employee';

export type DepartementType = 'IT' | 'Marketing' | 'HR';
export type LevelType = 'J' | 'M' | 'S';

export interface IEmployee {
  id: string;
  name: string;
  departement: DepartementType;
  level: LevelType;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  //ON IMPORT LE PIPE AUSS ICI LE UPPSERCASEPIPE
  imports: [Employee],
  styleUrl: './app.css',
})
export class App {
 
  employee: IEmployee = {
    id: '1245efdkhh12dhje',
    name: 'Jao',
    departement: 'IT',
    level: 'M',
  };

  // 5 - A P P E L  E T  L O G
  clickParent(id: string) {
    console.log(' voila le id ', id);
  }
}
