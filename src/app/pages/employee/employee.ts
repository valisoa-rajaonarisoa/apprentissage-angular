import { Component, input, output } from '@angular/core';
import { UserType } from '../../types/user';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  employees = input.required<UserType[]>();

  isLoading = input.required<boolean>();

  idSelected = output<string>();

  onSelect(id: string) {
    this.idSelected.emit(id);
  }
}
