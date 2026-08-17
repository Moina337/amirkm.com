import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SocialLink } from '../../core/models/social-link.model';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      *ngIf="whatsappLink$ | async as whatsappLink"
      [href]="whatsappLink.href"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-bg"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-7 w-7 fill-current">
        <path d="M19.05 4.95A9.9 9.9 0 0 0 12.1 2a9.96 9.96 0 0 0-8.66 15.12L2 22l5.05-1.38a9.96 9.96 0 0 0 15.1-8.67 9.87 9.87 0 0 0-3.1-7.0ZM12.08 18.4c-1.3 0-2.58-.35-3.7-.99l-.27-.16-2.99.82.8-2.9-.17-.28a7.3 7.3 0 0 1-1.1-3.86c0-4.03 3.29-7.3 7.35-7.3 1.96 0 3.8.76 5.18 2.13a7.26 7.26 0 0 1 2.14 5.18c0 4.05-3.27 7.34-7.34 7.34Zm4.02-5.46c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.49.11-.15.22-.57.71-.7.86-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.49-1.17-.67-1.6-.18-.42-.36-.36-.49-.36h-.42c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.54 2.35 3.73 3.31.52.22.93.35 1.25.45.52.17.99.15 1.36.09.42-.06 1.3-.53 1.49-1.04.19-.51.19-.94.13-1.03-.06-.1-.2-.16-.42-.27Z"/>
      </svg>
    </a>
  `,
})
export class WhatsappButtonComponent {
  whatsappLink$: Observable<SocialLink | undefined>;

  constructor(private portfolio: PortfolioService) {
    this.whatsappLink$ = this.portfolio.getProfile().pipe(
      map((profile) => profile.social.find((link) => link.platform === 'whatsapp')),
    );
  }
}
