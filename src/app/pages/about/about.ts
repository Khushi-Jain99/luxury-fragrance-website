import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements OnInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submitted = false;

  ngOnInit() {
    this.seo.updateTitle('Our Story');
    this.seo.updateMeta('Learn about the heritage and vision behind Luminaire fragrances.');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.submitted = true;
      this.contactForm.reset();
      setTimeout(() => this.submitted = false, 5000);
    }
  }
}
