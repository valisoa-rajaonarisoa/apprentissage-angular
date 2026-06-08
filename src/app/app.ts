import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeApiService } from './services/employee-api-service';
import { UserType } from './types/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from './pages/employee/employee';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Employee, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  //injecter le service
  private employeeApi = inject(EmployeeApiService);

  //subscription
  private destroyRef = inject(DestroyRef);

  //employyes
  employees = signal<UserType[]>([]);

  //loading
  isLoading = signal(false);

  //selected
  employeeSelected = signal<UserType | undefined>(undefined);

  ngOnInit(): void {
    // 1. Charger les employés une première fois au démarrage
    this.loadEmployee();

    // 2. ÉCOUTER LE TALKIE-WALKIE : Dès que refresh$ émet, on recharge la liste !
    //ici, on ecoute le refresh, dés qu'on attend quelque chose de dans, on execute this.loadEmployee()
    //normalement , on doit .subscribe((val)=>console.log(val)), ici void, est on execute this.loadEmployee()
    this.employeeApi.refresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadEmployee());
  }

  // Étape isolée pour pouvoir la rappeler facilement
  loadEmployee() {
    this.isLoading.set(true);
    this.employeeApi
      .getAllEmployee()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          this.employees.set(users);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log("une erreur s'est produite ", err);
        },
      });
  }

  //create
  userData = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    age: new FormControl(1, [Validators.required]),
  });

  onSubmit() {
    if (this.userData.valid) {
      console.log('value ', this.userData.value);
      this.employeeApi.createEmployee(this.userData.value as UserType).subscribe({
        next: (response) => {
          console.log('voici la response ', response);

          //appel du triggerRefresh qui va ensuite faire next() //on sonne l'alarme
          this.employeeApi.triggerRefresh();

          //reinitialise le inpu
          this.userData.reset();
        },

        //error
        error: (err) => {
          console.log("une erreur s'est produite lors du create ", err);
        },
      });
    }
  }

  //getOne

  //delete
  deleteEmployee(id: string) {
    console.log('voici id ', id);
    this.isLoading.set(true);
    this.employeeApi
      .deleteEmployee(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          console.log(' voila la resp ', resp);
          //refresh
          this.employeeApi.triggerRefresh();

          this.isLoading.set(true);
        },
        error: (error) => {
          console.log('une error ', error);
        },
      });
  }
}
