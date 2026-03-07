import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  private fallbackApplied = false;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    if (this.fallbackApplied) return;
    this.fallbackApplied = true;
    this.el.nativeElement.src = '/images/placeholder.svg';
  }
}
