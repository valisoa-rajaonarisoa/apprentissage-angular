import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-life-cycle',
  imports: [RouterLink],
  templateUrl: './life-cycle.html',
  styleUrl: './life-cycle.css',
})
export class LifeCycle
  implements
    OnInit,
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked,
    AfterContentInit,
    AfterContentChecked,
    OnDestroy
{
  //1 - constructeur
  constructor() {
    console.log('constructor ');
  }

  // 2 - ngOnit
  ngOnInit(): void {
    console.log('ngOnInit');
  }

  // 3 ngAfterViewInit
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy ');
  }
}
