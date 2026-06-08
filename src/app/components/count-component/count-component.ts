import { Component, input, model, output } from '@angular/core';
import { UserT } from '../../app';

@Component({
  selector: 'app-count-component',
  imports: [],
  templateUrl: './count-component.html',
  styleUrl: './count-component.css',
})
export class CountComponent {
  //Déclaration du model (remplace input et output)
  // users = model<UserT[]>();
  users = model<UserT[]>();

  selected = output<number>();

  deleteUser(id: number) {
    // Vu que 'users' est un model, c'est un WritableSignal !
    // On peut utiliser .update() pour retirer l'utilisateur.
    // Le parent sera notifié automatiquement du changement.
    this.users.update((currentUsers) => (currentUsers as UserT[]).filter((user) => user.id !== id));
  }
}
