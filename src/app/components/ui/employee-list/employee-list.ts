import { Component, input, output } from '@angular/core';
import { IEmployee } from '../../../models/employee.model';
import { LevelPipe } from '../../../pipes/level-pipe';

@Component({
  selector: 'app-employee-list',
  imports: [LevelPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees = input.required<IEmployee[]>();

  //idSelected
  employeeIdSelected = output<string>();

  employeeIdDeleted = output<string>();

  handleClickDetail(id: string) {
    //emission de data
    this.employeeIdSelected.emit(id);
  }

  handleClickDelete(id: string) {
    //emission de data
    this.employeeIdDeleted.emit(id);
  }
}
