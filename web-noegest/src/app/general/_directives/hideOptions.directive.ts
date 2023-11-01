import { AfterViewInit, Directive, ElementRef, Input, Renderer2 }  from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hideOptions]',
})
export class HideOptionsOnClickDirective implements AfterViewInit {
  constructor(
    private el:ElementRef,
    private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setBackgroundColor('yellow');
    //throw new Error('Method not implemented.');
  }

  setBackgroundColor(color: string){
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color)
  }

  @Input() color = 'yellow';

  /*@HostListener('click', ['$event'])

  onClick(event: MouseEvent) {
    const optionList = (event.target as HTMLElement).parentElement as HTMLElement;
    optionList.style.color = 'red';
    //this.renderer.color = 'lightgreen';
  }*/
}