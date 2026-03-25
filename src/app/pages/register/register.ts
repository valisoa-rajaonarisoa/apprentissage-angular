import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { Subscription } from 'rxjs';
import { UserRegisterType } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnDestroy {
  // 1 - SIGNAL PAR DAFAUT POUR LE CACHE LE PASSWORD
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // 2 - FORM GROUP **************
  private formBuild = inject(FormBuilder);
  //formulaire
  registerData = this.formBuild.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  // 3 - A P I  S E R V I C E
  private authService = inject(AuthService);
  //creation subscription
  private subscription?: Subscription;
  // signal pour afficher errer lors du register
  invalidCredetianls = signal(false);

  // 4 -   G E S T I O N   D E S   R O U T A G E S
  private route = inject(Router);
  //si okey donc navigation vers /membre
  private navigateToHome() {
    this.route.navigateByUrl('/membre');
  }

  //5- S U B M I T   DU  F O R M U L A I R E
  onSubmit() {
    //affichage
    console.log('voici  ,', this.registerData.value);
    if (this.registerData.valid) {
      const userData: UserRegisterType = {
        email: this.registerData.get('email')?.value as string,
        password: this.registerData.get('password')?.value as string,
        username: this.registerData.get('username')?.value as string,
      };
      this.subscription = this.authService.register(userData).subscribe({
        //traitement des erros
        next: (resultat) => {
          //sucesss
          //navige vers l'esapce membre
          console.log(' voici le resulat ', resultat);
          this.navigateToHome();
        },
        error: (error) => {
          console.log(" une erreur s'est produite ", error);
          this.invalidCredetianls.set(true);
        },
      });
    }
  }

  // 6 - D E S A B O N N E M E N T
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
