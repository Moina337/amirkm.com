import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { ContactContent } from '../../core/models/profile.model';
import { SocialLink } from '../../core/models/social-link.model';
import { SocialIconComponent } from '../../shared/social-icon/social-icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SocialIconComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contact$: Observable<ContactContent>;
  social$: Observable<SocialLink[]>;

  constructor(private portfolio: PortfolioService) {
    const profile$ = this.portfolio.getProfile();
    this.contact$ = profile$.pipe(map((profile) => profile.contact));
    this.social$ = profile$.pipe(map((profile) => profile.social));
  }
}
