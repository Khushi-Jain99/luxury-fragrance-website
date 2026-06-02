import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta) { }

  /** Title is kept consistent across all pages via index.html */
  updateTitle(_title: string) { }

  updateMeta(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }
}
