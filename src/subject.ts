//Contrairement au Observable le Subject lui,
// on peut creer le flux de donne , puis plus tard en bas,
//  on peut envoie les next value
// c'est comme ci, on est abonné a un chaine youtube,
// et au file du temps, des que le chaine emete des videos on est notifié

import { from, Subject } from "rxjs";

// 4 - Creation d'un autre flux
const alpha$ = from(["1", "2", "titi", "tata"]);

// 1 - création du subject
const subject$ = new Subject<string>();

// 2 - creation 2 abonnées => donc les 2 abonnés ecoute et il seront notifié
subject$.subscribe({
  next: (val: string) => {
    console.log("Abonné 1 Réçu : ", val);
  },
});
subject$.subscribe({
  next: (val: string) => {
    console.log("Abonné 2 Réçu : ", val);
  },
});

// 3 - émission de valeur pour le subject (observable)
subject$.next("Tuto sur Rxjs");

subject$.next("Tuto sur Angular");

// 5 - subject comme un observer , donc toute les valeur dans alpha seront envoyés au abonnés du subject
alpha$.subscribe(subject$); // c'est le proxy 
