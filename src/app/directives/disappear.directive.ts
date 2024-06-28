import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisappear]',
})
export class DisappearDirective implements OnInit {
  @Input() delay: number = 1000;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    setTimeout(() => {
      this.el.nativeElement.style.display = 'none';
    }, this.delay);
  }
}

