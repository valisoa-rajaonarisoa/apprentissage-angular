import { Component } from '@angular/core';
import { Employee } from './employee/employee';
import { CardEmployee } from './card-employee/card-employee';

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
  imports: [Employee, CardEmployee],
  styleUrl: './app.css',
})
export class App {
  listEmployes: IEmployee[] = [
    {
      id: '1245efdkhh12dddhje',
      name: 'Jao',
      departement: 'IT',
      level: 'M',
    },
    {
      id: '1245efzedkhh12dhje',
      name: 'Koto',
      departement: 'HR',
      level: 'J',
    },
    {
      id: '1245esdfafdkhh12dhje',
      name: 'Tanjona',
      departement: 'HR',
      level: 'S',
    },
  ];

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
