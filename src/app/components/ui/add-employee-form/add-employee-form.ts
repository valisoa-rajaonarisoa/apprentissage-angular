import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { IEmployee } from '../../../models/employee.model';
import { EmployeeApiService } from '../../../services/apis/employee-api-service';

@Component({
  selector: 'app-add-employee-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './add-employee-form.html',
  styleUrl: './add-employee-form.css',
})
export class AddEmployeeForm {
  // creation d'un formBuilder
  private formBuilder = inject(FormBuilder);

  // 1  - INJECTION DU api service

  private employeeApiService = inject(EmployeeApiService);

  // 1) - a)- forumlaire
  formData = this.formBuilder.group({
    id: new FormControl(''),
    //nomAttribut : [valeurPardefaul, [ les validators,...]]
    name: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
    departement: new FormControl('Junior'),
    level: new FormControl('Ressources Humaines'),
  });

  // 1) -b) - submit
  onSubmit() {
    if (this.formData.valid) {
      // 1 ) C)- envoie directement
      this.employeeApiService.createEmployee(this.formData.value as IEmployee).subscribe({
        //OK
        next: (response) => {
          console.log(" voici l'emploiee creer ", response);
          // d - activer la bombe refresh avec troggerRefresh
          this.employeeApiService.triggerRefresh();
          //initialiser les input
          this.formData.reset();
        },
        //ERROR
        error: (err) => {
          console.log('une erreur lors du create', err);
        },
      });
    }
  }
}
