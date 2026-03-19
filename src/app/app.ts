import { Component, computed, effect, signal } from '@angular/core';
import { Employee } from './employee/employee';
import { DatePipe } from '@angular/common';
import { UpperCasePipe } from './upper-case-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  //ON IMPORT LE PIPE AUSS ICI LE UPPSERCASEPIPE
  imports: [Employee, DatePipe, UpperCasePipe],
  styleUrl: './app.css',
})
export class App {
  //1 - D É F I N I R   U N   E T A T
  name = signal('Valisoa');
  age = signal(22);

  // 3 -  É C O U T E R  A U   E V E N T  ET 4 - RÉ A G I R 
  increment() {
    //ON PEUT UTILISER SET => POUR CHANGEEMENT ET UPDATE => ON VEUT METTRE AJOUR AVEC L'ANCIEN VALEUR
    this.age.update((age) => age + 1);
  }

  decrement() {
    //ON PEUT UTILISER SET => POUR CHANGEEMENT ET UPDATE => ON VEUT METTRE AJOUR AVEC L'ANCIEN VALEUR
    this.age.update((age) => age - 1);
  }
}
