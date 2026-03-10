import { Component } from '@angular/core';

export type DepartementType = 'IT' | 'Marketing' | 'HR';
export type LevelType = 'J' | 'M' | 'S';

interface IEmployee {
  id: string;
  name: string;
  departement: DepartementType;
  level: LevelType;
}
@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  employee: IEmployee = {
    id: '1245efdkhh12dhje',
    name: 'Jao',
    departement: 'IT',
    level: 'S',
  };
}
