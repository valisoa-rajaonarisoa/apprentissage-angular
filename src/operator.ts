import { from, map, take } from "rxjs";

// LA liste
const list = [0, 1, 12, 56, 45, 7, 4];

type UserType = {
  lastName: string;
  firstName: string;
  birthDate: Date;
};
const users: UserType[] = [
  {
    lastName: "Jean",
    firstName: "Eric",
    birthDate: new Date("1985-06-12"),
  },
  {
    lastName: "Rakoto",
    firstName: "Hery",
    birthDate: new Date("1990-03-25"),
  },
  {
    lastName: "Andrianina",
    firstName: "Mialy",
    birthDate: new Date("1995-11-08"),
  },
  {
    lastName: "Randria",
    firstName: "Tiana",
    birthDate: new Date("2000-01-15"),
  },
  {
    lastName: "Smith",
    firstName: "John",
    birthDate: new Date("1988-07-19"),
  },
  {
    lastName: "Doe",
    firstName: "Jane",
    birthDate: new Date("1992-09-30"),
  },
  {
    lastName: "Rabe",
    firstName: "Toky",
    birthDate: new Date("1998-04-22"),
  },
  {
    lastName: "Rasoanaivo",
    firstName: "Fara",
    birthDate: new Date("1983-12-05"),
  },
];
// 1 - Observable
const obs1 = from(users);

// a- pour afficher seulement le nom des users , on peut creer un new flux apartir de obs1
// // 2 - Subsciption
obs1
  .pipe(
    map((user: UserType) => user.lastName),
    take(4), //je veux avoir 4 element 
  )
  .subscribe({
    next: (val) => {
      console.log("Récu :", val);
    },
    complete: () => {
      console.log(" completed");
    },
  });
