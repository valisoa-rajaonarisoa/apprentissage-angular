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

  //talk-walkie
  private refreshSubject = new Subject<void>();

  //alarme
  refresh$ = this.refreshSubject.asObservable();

  //methode appeller apres success add to formulaire
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
