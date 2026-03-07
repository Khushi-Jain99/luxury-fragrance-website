import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submitted = false;

  ngOnInit(): void {
    this.seo.updateTitle('Contact');
    this.seo.updateMeta('Reach out to Aurelia for inquiries, collaborations, or a private fragrance consultation.');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitted = true;
      this.contactForm.reset();
      setTimeout(() => (this.submitted = false), 5000);
    }
  }
}
