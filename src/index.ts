import { Observable, Subscriber } from "rxjs";

// 1 - CREATE OBSERVABLE= qui emet de valeur
const observable = new Observable((subs: Subscriber<number>) => {
  let i = 0;
  setInterval(() => {
    i++;
    subs.next(i);
  }, 1000);
});

// 2 - CREATION D'UN OBSERVER = qui écoute
const subscription = observable.subscribe({
  // a- récuperation de la valeur récupré dans le next
  next: (value: number) => {
    console.log("valeur récu", value);
  },
});

// 3- arret
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
