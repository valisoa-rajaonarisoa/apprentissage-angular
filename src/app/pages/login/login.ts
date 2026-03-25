import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth-service';
import { UserLoginType, UserRegisterType } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {
  //injcection service
  private authService = inject(AuthService);

  //injection rooter pour faire des redirections
  private route = inject(Router);

  //creation subscription
  private subscription?: Subscription;

  //formBuild
  private formBuild = inject(FormBuilder);

  // SIGNAL AFFICAHE PASSWORD
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // SIGNAL POUR AFFICHAGE D'ERREUR LOGIN
  invalidCredetianls = signal(false);

  //in

  //formulaire
  registerData = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  //navigateToHome
  private navigateToHome() {
    this.route.navigateByUrl('/membre');
  }

  onSubmit() {
    //affichage
    console.log('voici  ,', this.registerData.value);

    if (this.registerData.valid) {
      const userData: UserLoginType = {
        email: this.registerData.get('email')?.value as string,
        password: this.registerData.get('password')?.value as string,
      };
      this.subscription = this.authService.login(userData).subscribe({
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

  ngOnDestroy(): void {
    //desabonné
    this.subscription?.unsubscribe();
  }
}
