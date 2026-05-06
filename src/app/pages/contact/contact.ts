import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SeoService } from '../../services/seo';
import { ContactService } from '../../services/contact';

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
  private contactService = inject(ContactService);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  isSending = false;

  ngOnInit(): void {
    this.seo.updateTitle('Contact');
    this.seo.updateMeta('Reach out to Aurelia for inquiries, collaborations, or a private fragrance consultation.');
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSending) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    this.status = 'sending';

    this.contactService
      .sendMessage(this.contactForm.value)
      .pipe(finalize(() => (this.isSending = false)))
      .subscribe({
        next: () => {
          this.status = 'success';
          this.contactForm.reset();
        },
        error: () => {
          this.status = 'error';
        }
      });
  }
}
