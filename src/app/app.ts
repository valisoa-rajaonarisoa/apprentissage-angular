import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Person } from './models/person.model';
import { PersonService } from './services/person-service';
import { debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, AsyncPipe], // AsyncPipe => pour utiliser async
  templateUrl: './app.html',
  styleUrl: './app.css',
})

//ON destroy life cycle hook, permet de manipule lorsque le composant sera dead, change page ou confition ...
export class App {
  // 1 create ctrl
  searchCtrl = new FormControl();

  // 2 le service
  private personService = inject(PersonService);

  // 3 tableau de data,
  //il devient un obserable, il va observer le sarchCTRL, puis on lui ajoute un pipe (tuyau pour faire une operation)
  personData$: Observable<Person[]> = this.searchCtrl.valueChanges.pipe(
    //b- ajout startWith, etant initialisation, si je met par exemle 'oe' donc John doe va s'afficher
    startWith(''),
    debounceTime(500), //attendre 500ms pour le dernier frap avant de contacter le service
    //a- Ici il prend startWith avec param le value du seacrh taper
    switchMap((value: string | null) => {
      const text = value ? value : '';
      return this.personService.search(text);
    }),
  );
}
