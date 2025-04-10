/* eslint-disable @angular-eslint/directive-selector */
import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[highlight]',
    standalone: false
})

export class HighlightDirective implements AfterViewInit {

  @Input() color = 'whitesmoke'

  constructor(private el:ElementRef,
    private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color)
  }

  setBackgroundColor(color:string){
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color)
  }

  //mouse enter est le survol par la souris
  @HostListener('mouseenter') onMouseEnter(){
    this.setBackgroundColor('lightgray');
  }

  // quand la souris s'en va, 'this color' sera appliqué, comme à l'origine, ou selon la nouvelle valeur donnée par clic
  @HostListener('mouseleave') onMouseLeave(){
    this.setBackgroundColor(this.color)
  }

  // permet de figer la couleur par un clic
  @HostListener('click') onClick(){
    this.color = 'lightgray'
  }
}