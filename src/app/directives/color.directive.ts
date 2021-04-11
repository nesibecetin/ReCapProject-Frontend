import { HostListener, Renderer2 } from '@angular/core';
import { Input,  } from '@angular/core';
import { Directive, ElementRef, OnInit  } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
  constructor(private item: ElementRef, private renderer:Renderer2) {
 
  }
 
  @HostListener("mouseenter")
  onmouseenter() {
    this.renderer.setStyle(this.item.nativeElement, "backgroundColor", "gray");
    console.log("mouseenter");
  }
 
  @HostListener("mouseleave")
  onmouseleave(){
    this.renderer.setStyle(this.item.nativeElement, "backgroundColor", "#ffc107");
    console.log("mouseleave");
  }

}
