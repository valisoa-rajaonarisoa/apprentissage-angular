import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserLoginType, UserProfile, UserRegisterType } from '../../models/user.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //injection du httpClient
  private http = inject(HttpClient);

  //url
  private BASE_URL = 'http://localhost:5000';

  //user connecté
  //undefined => on ne seait pas encore si le user est logé donc au demarrage de l'apk
  //null => on sait que l'user n'est pas logge donc ->null
  //user => connecté
  user = signal<UserProfile | undefined | null>(undefined);

  //login
  login(userLogin: UserLoginType): Observable<UserProfile | null | undefined> {
    return this.http.post(`${this.BASE_URL}/users/login`, userLogin).pipe(
      tap((resultat: any) => {
        console.log(' voila le resulat avec le tap ', resultat);

        //mettre dans le localStorage le token et le userInfo dans le user
        console.log(' yes yes  ', resultat.accessToken);
        localStorage.setItem('token', resultat.accessToken);

        //mettre le user dans le user
        const user = Object.assign(new UserProfile(), resultat.userInfo);

        // mettre dans le user signal
        this.user.set(user);
      }),
      //on souhaite retourne l'user maintenant qui est connecté
      map((result: any) => {
        return this.user(); //on formate pourque le resultat du post renvoie user de type UserProfile
      }),
    );
  }

  //register apres ca c'est sure, c'est la redirection
  register(userRegister: UserRegisterType) {
    return this.http.post(`${this.BASE_URL}/users`, userRegister).pipe(
      tap((resultat: any) => {
        console.log(' voila le resulat avec le tap ', resultat);

        //mettre dans le localStorage le token et le userInfo dans le user

        console.log(' yes yes  ', resultat['accessToken']);
        localStorage.setItem('token', resultat.accessToken);

        //mettre le user dans le user
        const user = Object.assign(new UserProfile(), resultat.userInfo);

        // mettre dans le user signal
        this.user.set(user);
      }),
      //on souhaite retourne l'user maintenant qui est connecté
      map((result: any) => {
        return this.user(); //on formate pourque le resultat du post renvoie user de type UserProfile
      }),
    );
  }

  logout() {
    //supprimer dans le localStorage

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      //rendre null l'user
      this.user.set(null);
    }
  }
}
