import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { EmployeeApiService } from '../../services/employee-api-service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  //le service
  private ApiService = inject(EmployeeApiService);

  //2 - a )- CREATION D'UN SUBSCRIPTION
  private destroyRef = inject(DestroyRef);

  constructor() {
    console.log(' constructor');
  }

  //ngOnint
  ngOnInit(): void {
    //2) -b)- je met dans subscription le subcrption getAll
    this.ApiService.getAllEmployee()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (employees) => {
          console.log(' voila les employee ', employees);
        },
        error: (error) => {
          console.log(' une erreur ', error);
        },
      });
  }

  // //Une fois qu'on change de page ou tuer le component
  // ngOnDestroy(): void {
  //   console.log('byeee');
  //   // 2) - c) - on se desabonne ou arrete d'écouter
  //   this.subscription?.unsubscribe();
  // }
}
