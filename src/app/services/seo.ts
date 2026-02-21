import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string) {
    this.title.setTitle(`${title} | Luminaire Fragrances`);
  }

  updateMeta(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }
}
