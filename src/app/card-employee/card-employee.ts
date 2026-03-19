import { Component, input } from '@angular/core';
import { IEmployee } from '../app';
import { LevelPipe } from '../level-pipe';

@Component({
  selector: 'app-card-employee',
  imports: [LevelPipe],
  templateUrl: './card-employee.html',
  styleUrl: './card-employee.css',
})
export class CardEmployee {
  //Récupeation d'un element
  employee = input.required<IEmployee>();
}
