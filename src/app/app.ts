import { Component } from '@angular/core';
import { Employee } from './employee/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',

  imports: [Employee],
  styleUrl: './app.css',
})
export class App {}
