import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private data: IEmployee[] = [
    {
      id: '12erfdhf',
      departement: 'HR',
      level: 'M',
      name: 'Jean Paul',
    },
    {
      id: '12erfadhf',
      departement: 'HR',
      level: 'M',
      name: 'Herry John',
    },

    {
      id: '145jfg',
      departement: 'IT',
      level: 'S',
      name: 'Ford Gerrard',
    },
  ];

  //getAll
  getAllEmployee() {
    return this.data;
  }

  //getOne
  getOneEmployeeById(id: string) {
    return this.data.find((item) => item.id == id) || null;
  }

  //delete
  deleteEmployeeById(id: string) {
    this.data = this.data.filter((item) => item.id !== id);
  }

  createEmployee(employee: IEmployee) {
    //modifier le id
    const id = new Date().getSeconds();

    employee.id = id + '';

    console.log(" voici ",employee)

    this.data.push(employee);

    console.log('data ', this.getAllEmployee());
  }
}
