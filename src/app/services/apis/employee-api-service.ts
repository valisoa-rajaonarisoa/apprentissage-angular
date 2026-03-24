import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from '../../models/employee.model';
import { Observable, Subject } from 'rxjs';

const URL_BACK = `http://localhost:3000/employees`;
@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  //injecter le service http
  private http = inject(HttpClient);

  // 2 - creation d'un subject
  // C'est le bouton de l'alarme. Il est private pour que seul le service puisse appuyer dessus.
  // c'est le talkie -walkie, il va informer tout le monde des qu'il y aune changement surtout add
  private refreshSubject = new Subject<void>();

  // 3 - C'est le haut-parleur. Tout composant qui veut être au courant peut "écouter" ce flux.
  refresh$ = this.refreshSubject.asObservable();

  constructor() {}

  // 4 - C'est la méthode que le Formulaire va appeler après son succès.
  //  En faisant .next(), il fait retentir l'alarme dans toute l'application.
  triggerRefresh() {
    //envoie une next
    this.refreshSubject.next();
  }

  //getAll
  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(URL_BACK);
  }

  //getOne
  getOneEmployeeById(id: string) {
    return this.http.get<IEmployee | null>(`${URL_BACK}/${id}`);
  }

  //delete
  deleteEmployeeById(id: string) {
    return this.http.delete(`${URL_BACK}/${id}`);
  }

  createEmployee(employee: IEmployee) {
    //modifier le id
    const id = new Date().getSeconds();

    employee.id = id + '';
    //On retourne l'Observable pour que le composant puiise savoir quand c'est fait
    return this.http.post<IEmployee>(URL_BACK, employee);
  }
}
