import { Component } from '@angular/core';
import { Employee } from './employee/employee';
import { DatePipe } from '@angular/common';
import { UpperCasePipe } from './upper-case-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  //ON IMPORT LE PIPE AUSS ICI LE UPPSERCASEPIPE 
  imports: [Employee,DatePipe,UpperCasePipe],
  styleUrl: './app.css',
})
export class App {
  nom = 'telephone';
  price = 10.5;

  now = new Date();
}
