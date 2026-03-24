import { Component, inject, signal } from '@angular/core';
import { IEmployee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeList } from '../ui/employee-list/employee-list';
import { Employee } from '../ui/employee/employee';
import { RouterOutlet } from '@angular/router';
import { EmployeeApiService } from '../../services/apis/employee-api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [EmployeeList, Employee, RouterOutlet],
})
export class App {
  // 1 - I N J E C T I O N   DU  S E R V I C E
  private employeeApiService = inject(EmployeeApiService);

  // 1 ) - a) signal pour employee
  employees = signal<IEmployee[]>([]);

  // 1) -  b) signal pour l'emploiee selected
  employeeSelected = signal<IEmployee | null>(null);

  // 1) - c) signal pour le loading
  isLoading = signal<boolean>(false);

  // 3 - CONSTRUCTEUR S'EXECUTE UNE SEULE FOIS
  constructor() {
    //3) - a) - Au premiere moment (aCTUALISATION PAGE, premeier arrivé)
    //on charge les datas depuis le loadEmployee(), ca ce fait une seul fois,
    this.loadEmployees();

    // 3) - b) - Mise en place bombe :)
    // (Alarme ou abonnement sur le refresh dés que refresh entend next delcenché par le add apres,
    //alors on relance le loadEmployee,
    // )
    this.employeeApiService.refresh$.subscribe(() => this.loadEmployees());
  }

  // 2 ) - C H A R G M E N T   D Y N A M I Q U E    D E S   DATA
  //lors de l'actualisation, on lors d'un ajout d'un nouveau data, il sera declenché
  loadEmployees() {
    //Loading on allume le loading
    this.isLoading.set(true);

    this.employeeApiService.getAllEmployee().subscribe({
      //les bons datas se trouve dans le next
      next: (data) => {
        // a)- on ajoute dans le tab
        this.employees.set(data);

        //b)- on remet à false le loading
        this.isLoading.set(false);
      },

      //gestion error
      error: (error) => {
        console.log(" une erreur s'est produite ", error);
        this.isLoading.set(false); //on peut gerer aussi les errors
      },
    });
  }

  // 2 )  - a) - getOne
  getOneEmployee(id: string) {
    this.employeeApiService.getOneEmployeeById(id).subscribe({
      next: (item) => {
        //Récuperation des datas
        if (item) {
          this.employeeSelected.set(item);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération', err);
        this.employeeSelected.set(null);
      },
    });
  }
  // 2) - b) delete
  deleteEmployee(id: string) {
    this.employeeApiService.deleteEmployeeById(id).subscribe({
      next: (value) => {
        console.log('voici le resultat du delete', value);

        //Solution 1 : Alors on fait appel au loadEmployee(), le probleme ce que qu'on refait un appel à la bdd donc terme de performace
        //this.loadEmployees();

        //Solution 2 pro: fait un update coté signal
        this.employees.update((anc) => anc.filter((e) => e.id !== id));

        //reinitialiser également le selecedEmployee si le id==id delete
        if (this.employeeSelected()?.id == id) {
          this.clearDetails();
        }
      },
      error: (error) => {
        console.log("une erreur s'est produite lors du delete ", error);
      },
    });
  }

  clearDetails() {
    this.employeeSelected.set(null);
  }
}
