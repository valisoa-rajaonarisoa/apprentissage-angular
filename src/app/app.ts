import { Component, signal } from '@angular/core';
import { EmployeeList } from './employee-list/employee-list';

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
  imports: [EmployeeList],
})
export class App {
  //list
  employeeList = signal<IEmployee[]>([
    {
      id: 'emp-001',
      name: 'Tiana Rakoto',
      departement: 'IT',
      level: 'S', // Senior -> bg-green-500
    },
    {
      id: 'emp-002',
      name: 'Rova Niaina',
      departement: 'Marketing',
      level: 'M', // Middle -> bg-green-500 (selon ton code actuel)
    },
    {
      id: 'emp-003',
      name: 'Sitraka Solo',
      departement: 'HR',
      level: 'J', // Junior -> bg-red-400
    },
    {
      id: 'emp-004',
      name: 'Fano Andri',
      departement: 'IT',
      level: 'M',
    },
    {
      id: 'emp-005',
      name: 'Miora Lova',
      departement: 'Marketing',
      level: 'J', // Junior -> bg-red-400
    },
  ]);

  
}
