import { Routes } from '@angular/router';
import { AddEmployeeForm } from '../ui/add-employee-form/add-employee-form';

export const routes: Routes = [
  {
    path: 'new',
    component: AddEmployeeForm,
  },
];
