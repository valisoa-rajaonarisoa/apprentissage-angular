import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CountComponent } from './components/count-component/count-component';

export type UserT = {
  id: number;
  name: string;
};
@Component({
  selector: 'app-root',
  imports: [CountComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  count = signal(0);

  users = signal([
    {
      id: 1,
      name: 'valisoa',
    },
    {
      id: 2,
      name: 'Anjara',
    },
  ]);

  //select users
  userSelected = signal<UserT | null>(null);

}
