import { Component, input } from '@angular/core';
import { IEmployee } from '../app';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employeeList = input.required<IEmployee[]>();

  
}
