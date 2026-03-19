import { Component, computed, input, output } from '@angular/core';
import { IEmployee } from '../app';
import { LevelPipe } from '../level-pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [LevelPipe, NgClass], //importer le ngClass
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  //Récuperation  du data avec son nom nom= input(),
  //  required pour dire que c'est requis
  employee = input.required<IEmployee>();

  //je cree une vraible
  bgColor = computed(() => {
    const level = this.employee().level;
    if (level == 'J') return 'bg-red-200';
    if (level == 'M') return 'bg-blue-300';
    else return 'bg-green-300';
  });

  //  O U T P U T
  //1 -  Création de l'output avec nomOutput= output<Type>() // c'est un event, le type c'est le type de retour
  // par exemple ici on veut le id de l'employee donc ce sera un string
  monOutput = output<string>();

  //2 - Je cree une fonction methode qui permet de récuperer le id et le mettre dans le output
  // donc ajout de valeur dans le output avec un event
  onClickNameEmployee() {
    //maintenant l'emission on n'oublie pas le () car c'est un signal de type input
    this.monOutput.emit(this.employee().id);
  }
}
