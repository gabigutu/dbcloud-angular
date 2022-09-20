import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEmphasized]'
})
export class EmphasizedDirective {

  constructor(el: ElementRef) {
    const color = el.nativeElement.dataset.color; // data-color
    console.log('read color', color);
    el.nativeElement.style.color = color;
  }

}
