import { Routes } from '@angular/router';
import { LifeCycle } from './components/life-cycle/life-cycle';
import { EmployeeList } from './components/employee-list/employee-list';

export const routes: Routes = [
  {
    path: 'life',
    component: LifeCycle,
  },
  {
    path: 'list',
    component: EmployeeList,
  },
];
