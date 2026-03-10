import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Valisoa';
  age = 22;

  counter = 0;

  //initialisation avec chaine vide
  text = '';

  Increment() {
    this.counter++;
  }

  //fonction pour ajouter du text
  OnEditText(value: string) {
    console.log('voila donc le value ', value);
    this.text = value;
  }

  //valuer par defaut du status
  status = 'text-red-500';

  onChangeColor(style: 'error' | 'sucess') {
    if (style == 'error') this.status = 'text-red-500';
    if (style == 'sucess') this.status = 'text-green-500';
  }



  // *************************password ****************
  textType : 'password' | 'text' = 'password';
  onChangeType() {
    if (this.textType == 'password') {
      this.textType = 'text';
    } else {
      this.textType = 'password';
    }
  }
}
