import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  //CREATE DATA MOCK 
  private DATA: Person[] = [
    {
      lastName: 'Jean',
      firstName: 'Eric',
      birthDate: new Date('1985-06-12'),
    },
    {
      lastName: 'Rakoto',
      firstName: 'Hery',
      birthDate: new Date('1990-03-25'),
    },
    {
      lastName: 'Andrianina',
      firstName: 'Mialy',
      birthDate: new Date('1995-11-08'),
    },
    {
      lastName: 'Randria',
      firstName: 'Tiana',
      birthDate: new Date('2000-01-15'),
    },
    {
      lastName: 'Smith',
      firstName: 'John',
      birthDate: new Date('1988-07-19'),
    },
    {
      lastName: 'Doe',
      firstName: 'Jane',
      birthDate: new Date('1992-09-30'),
    },
    {
      lastName: 'Rabe',
      firstName: 'Toky',
      birthDate: new Date('1998-04-22'),
    },
    {
      lastName: 'Rasoanaivo',
      firstName: 'Fara',
      birthDate: new Date('1983-12-05'),
    },
  ];

  //serach 
  search(term: string) {
    //mise en place delay aleatoire pour dire que c'est un peu comme appel api
    const delay = Math.round(Math.random() * 400) + 100;

    //preparation des datas ou la logique
    const filteredData: Person[] = this.DATA.filter(
      (person: Person) =>
        person.firstName.toLowerCase().includes(term.toLowerCase()) ||
        person.lastName.toLowerCase().includes(term.toLowerCase()),
    );

    //OBSERVABLE SEND DATA
    return new Observable((observer: Subscriber<Person[]>) => {
      setTimeout(() => {
        //send
        observer.next(filteredData);
        //se ferme
        observer.complete();
      }, delay);
    });
  }
}
