import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserType } from '../types/user';
import { Subject, Subscriber } from 'rxjs';

const URL = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private http = inject(HttpClient);

  //talk-walkie on peut ecouter et envoyer à la fois
  //void parcque, on ne va pas envoyer de data, juste notification
  private refreshSubject = new Subject<void>();

  //On l'expose en tant que écoute tout simplement
  // c'est à dire le rendre observable pour qu'on puisse faire (.subscribe apres)
  // désactive la partied'envoie (car c'est un SUbject donc il peut envoyer et écouter)
  //on aura juste besoin que la partie observale
  refresh$ = this.refreshSubject.asObservable();

  //methode appeller apres success add to formulaire
  //fonction, pour envoyer de la data(ici pour sonner l'alarme), au lieu de .next("bonjour") car void
  triggerRefresh() {
    this.refreshSubject.next();
  }

  getAllEmployee() {
    return this.http.get<UserType[]>(URL);
  }

  getOneEmployee(id: string) {
    return this.http.get<UserType | undefined>(`${URL}/${id}`);
  }

  deleteEmployee(id: string) {
    return this.http.delete<UserType | undefined>(`${URL}/${id}`);
  }

  createEmployee(user: UserType) {
    user.id = new Date().getSeconds() + '';
    return this.http.post<UserType | undefined>(`${URL}`, user);
  }
}
